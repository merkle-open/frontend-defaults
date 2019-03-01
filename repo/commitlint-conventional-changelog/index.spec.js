const execa = require('execa');

const lint = async (message, expectedError) => {
	let out = '';
	let hasError = false;
	try {
		out = (await execa.shell(`echo \"${message}\" | node_modules/.bin/commitlint`)).stdout;
	} catch (err) {
		hasError = true;
		out = err.toString();
	}
	if (hasError) {
		if (!expectedError) {
			console.error(`\n\n\n${out}`);
			console.error('no expectedError defined\n\n\n');
			return;
		}
		return !Boolean(out.indexOf(expectedError) >= 0);
	}
	return Boolean(out.indexOf('found 0 problems, 0 warnings') >= 0);
};

[
	['chore(test): message', true],
	['chore: message', true],
	// https://github.com/marionebl/commitlint/issues/292
	['chore(scope): message\n\ndetails\n\nBREAKING CHANGE: something', true],
	['chore(scope): message\n\nBREAKING CHANGE: something', true],
	['chore(scope): message [ISSUE-1234]', true],
	[' : message', false, 'type may not be empty [type-empty]'],
	[
		'bugfix: message',
		false,
		'type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]',
	],
	['chore: Message', false, 'subject must not be sentence-case, start-case, pascal-case, upper-case [subject-case]'],
].forEach(([message, isValid, expectedError]) => {
	test(`"${message.replace(/\n/g, '\\n')}" -> ${isValid ? 'valid' : 'invalid'}`, async () => {
		expect(await lint(message, expectedError)).toBe(isValid);
	});
});
