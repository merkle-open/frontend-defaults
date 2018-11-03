const tslint = require('tslint');
const fs = require('fs');
const path = require('path');

const lintTSFile = (fileName) => {
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

describe('namics tslint-config rules', () => {
	[
		{
			name: 'arrow-parens',
			tests: [
				{ name: 'arrow-parens ok', file: 'arrow-parens.ts', errors: 0 },
				{
					name: 'arrow-parens error',
					file: 'arrow-parens_err.ts',
					errors: 1,
					errorMessage: 'Parentheses are required around the parameters of an arrow function definition',
				},
			],
		},
		{
			name: 'arrow-return-shorthand',
			tests: [
				{ name: 'arrow-return-shorthand ok', file: 'arrow-return-shorthand.ts', errors: 0 },
				{
					name: 'arrow-return-shorthand error',
					file: 'arrow-return-shorthand_err.ts',
					errors: 1,
					errorMessage:
						"This arrow function body can be simplified by omitting the curly braces and the keyword 'return'.",
				},
			],
		},
		{
			name: 'ban-types',
			tests: [
				{ name: 'ban-types ok', file: 'ban-types.ts', errors: 0 },
				{
					name: 'ban-types error',
					file: 'ban-types_err.ts',
					errors: 1,
					errorMessage: "Don't use 'Object' as a type. Avoid using the `Object` type. Did you mean `object`?",
				},
			],
		},
		{
			name: 'variable-name',
			tests: [
				{ name: 'variable-name ok', file: 'variable-name.ts', errors: 0 },
				{
					name: 'variable-name wildName',
					file: 'variable-name_wild-name.ts',
					errors: 1,
					errorMessage: 'variable name must be in lowerCamelCase, PascalCase or UPPER_CASE',
				},
				{
					name: 'variable-name ban',
					file: 'variable-name_ban.ts',
					errors: 8,
					errorMessage: 'variable name clashes with keyword/type',
				},
			],
		},
		{
			name: 'indent',
			tests: [
				{
					name: 'indent ok',
					file: 'indent.ts',
					errors: 0,
				},
				{
					name: 'indent error',
					file: 'indent_err.ts',
					errors: 1,
					errorMessage: 'tab indentation expected',
				},
			],
		},
	].forEach(({ name, tests }) => {
		describe(`rule ${name}`, () => {
			tests.forEach((test) => {
				it(`${test.name}`, () => {
					const result = lintTSFile(path.join('__test__', `${test.file}`));
					expect(result.errorCount).toBe(test.errors);
					if (test.errorMessage) {
						expect(result.failures[0].failure).toBe(test.errorMessage);
					}
				});
			});
		});
	});
});
