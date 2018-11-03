const tslint = require('tslint');
const fs = require('fs');
const path = require('path');

const lintTSXFile = (fileName) => {
	const configurationFilename = path.join('build', 'tslint.json');
	const options = {
		fix: false,
		formatter: 'json',
	};
	const fileContents = fs.readFileSync(fileName, 'utf8');
	const linter = new tslint.Linter(options);
	const configuration = tslint.Configuration.findConfiguration(configurationFilename, fileName).results;
	linter.lint(fileName, fileContents, configuration);
	return linter.getResult();
};

describe('namics tslint-config react-rules', () => {
	[{ name: 'jsx-no-multiline-js', errors: 0 }].forEach(({ name, errors, errorMessage }) => {
		describe(`rule ${name}`, () => {
			it('valid', () => {
				expect(lintTSXFile(path.join('__test__', `${name}.tsx`)).errorCount).toBe(0);
			});
			it('invalid', () => {
				const result = lintTSXFile(path.join('__test__', `${name}_err.tsx`));
				expect(result.errorCount).toBe(errors);
				if (errorMessage) {
					expect(result.failures[0].failure).toBe(errorMessage);
				}
			});
		});
	});
});
