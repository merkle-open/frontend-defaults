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
	[
		{
			name: 'jsx-no-multiline-js',
			tests: [
				{
					name: 'jsx-no-multiline-js ok',
					file: 'jsx-no-multiline-js.tsx',
					errors: 0,
				},
			],
		},
		{
			name: 'jsx-boolean-value',
			tests: [
				{
					name: 'jsx-boolean-value ok',
					file: 'jsx-boolean-value.tsx',
					errors: 0,
				},
				{
					name: 'jsx-boolean-value error',
					file: 'jsx-boolean-value_err.tsx',
					errors: 1,
					errorMessage: 'Value must be omitted for boolean attributes',
				},
			],
		},
		{
			name: 'jsx-no-lambda',
			tests: [
				{
					name: 'jsx-no-lambda ok',
					file: 'jsx-no-lambda.tsx',
					errors: 0,
				},
			],
		},
	].forEach(({ name, tests }) => {
		describe(`rule ${name}`, () => {
			tests.forEach((test) => {
				it(`${test.name}`, () => {
					const result = lintTSXFile(path.join('__test__', `${test.file}`));
					expect(result.errorCount).toBe(test.errors);
					if (test.errorMessage) {
						expect(result.failures[0].failure).toBe(test.errorMessage);
					}
				});
			});
		});
	});
});
