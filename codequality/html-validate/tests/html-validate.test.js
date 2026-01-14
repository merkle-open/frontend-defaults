const path = require('path');
const fs = require('fs');

const fixturesRoot = path.join(__dirname);
const validDir = path.join(fixturesRoot, 'valid');
const invalidDir = path.join(fixturesRoot, 'invalid');
const warnDir = path.join(fixturesRoot, 'warn');

function collectFiles(dir) {
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith('.html'))
		.map((f) => path.join(dir, f));
}

let hv = null;
try {
	// prefer package-local html-validate
	const pkgRoot = path.resolve(__dirname, '..');
	const mod = require(require.resolve('html-validate', { paths: [pkgRoot] }));
	const HtmlValidate = mod.HtmlValidate || mod;
	const config = require(path.join(__dirname, '..', 'index.js'));
	hv = new HtmlValidate(config);
} catch (err) {
	// hv stays null -> tests will be skipped
}

const validFiles = collectFiles(validDir);
const invalidFiles = collectFiles(invalidDir);
const warnFiles = collectFiles(warnDir);

if (!hv) {
	test.skip('html-validate not installed — skipping fixture tests', () => {});
} else {
	describe('valid fixtures', () => {
		test.each(validFiles.map((p) => [path.relative(fixturesRoot, p), p]))(
			'%s should have no errors',
			(_, filePath) => {
				const src = fs.readFileSync(filePath, 'utf8');
				const report = hv.validateString(src, filePath);
				const results = report && report.results ? report.results : [report];
				const errors = results.reduce(
					(acc, r) => acc + (r.messages ? r.messages.filter((m) => m.severity === 2).length : 0),
					0,
				);
				expect(errors).toBe(0);
			},
		);
	});

	describe('invalid fixtures', () => {
		test.each(invalidFiles.map((p) => [path.relative(fixturesRoot, p), p]))(
			'%s should report errors',
			(_, filePath) => {
				const src = fs.readFileSync(filePath, 'utf8');
				const report = hv.validateString(src, filePath);
				const results = report && report.results ? report.results : [report];
				const errors = results.reduce(
					(acc, r) => acc + (r.messages ? r.messages.filter((m) => m.severity === 2).length : 0),
					0,
				);
				expect(errors).toBeGreaterThan(0);
			},
		);
	});

	describe('warn fixtures', () => {
		test.each(warnFiles.map((p) => [path.relative(fixturesRoot, p), p]))(
			'%s should report warnings but no error',
			(_, filePath) => {
				const src = fs.readFileSync(filePath, 'utf8');
				const report = hv.validateString(src, filePath);
				const results = report && report.results ? report.results : [report];

				let errors = 0;
				let warnings = 0;

				results.forEach((r) => {
					if (r.messages) {
						errors += r.messages.filter((m) => m.severity === 2).length;
						warnings += r.messages.filter((m) => m.severity === 1).length;
					}
				});

				expect(errors).toBe(0);
				expect(warnings).toBeGreaterThan(0);
			},
		);
	});
}
