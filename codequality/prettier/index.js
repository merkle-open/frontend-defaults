module.exports = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	endOfLine: 'auto',
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	jsxBracketSameLine: false,
	arrowParens: 'always',
	overrides: [
		{
			files: '*.(gql|graphql)',
			options: {
				parser: 'graphql',
			},
		},
		{
			files: '*.html',
			options: {
				parser: 'html',
			},
		},
		{
			files: '*.(js|jsx)',
			options: {
				parser: 'babylon',
			},
		},
		{
			files: '*.json',
			options: {
				parser: 'json',
			},
		},
		{
			files: '*.md',
			options: {
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
				parser: 'markdown',
			},
		},
		{
			files: '*.mdx',
			options: {
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
				parser: 'mdx',
			},
		},
		{
			files: '*.(ts|tsx)',
			options: {
				parser: 'typescript',
			},
		},
		{
			// use 2 spaces and 80 with because stories also used in documentation
			files: '*.stories.(ts|tsx)',
			options: {
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
			},
		},
		{
			files: '*.(yml|yaml)',
			options: {
				useTabs: false,
				tabWidth: 2,
				parser: 'yaml',
			},
		},
	],
};
