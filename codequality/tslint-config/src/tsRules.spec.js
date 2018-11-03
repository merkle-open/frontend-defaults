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
			errors: 1,
			errorMessage: 'Parentheses are required around the parameters of an arrow function definition',
		},
		{
			name: 'arrow-return-shorthand',
			errors: 1,
			errorMessage:
				"This arrow function body can be simplified by omitting the curly braces and the keyword 'return'.",
		},
		{
			name: 'ban-types',
			errors: 1,
			errorMessage: "Don't use 'Object' as a type. Avoid using the `Object` type. Did you mean `object`?",
		},
		{ name: 'indent', errors: 1, errorMessage: 'tab indentation expected' },
	].forEach(({ name, errors, errorMessage }) => {
		describe(`rule ${name}`, () => {
			it('valid', () => {
				expect(lintTSFile(path.join('__test__', `${name}.ts`)).errorCount).toBe(0);
			});
			it('invalid', () => {
				const result = lintTSFile(path.join('__test__', `${name}_err.ts`));
				expect(result.errorCount).toBe(errors);
				if (errorMessage) {
					expect(result.failures[0].failure).toBe(errorMessage);
				}
			});
		});
	});
});
