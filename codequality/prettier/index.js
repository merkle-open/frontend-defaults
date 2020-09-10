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
			files: ['*.json', '.*.json'],
			options: {
				parser: 'json-stringify',
			},
		},
		{
			files: ['*.(js|jsx)', '.*.(js|jsx)'],
			options: {
				parser: 'babylon',
			},
		},
		{
			files: ['*.(ts|tsx)', '.*.(ts|tsx)'],
			options: {
				parser: 'typescript',
			},
		},
		{
			// use 2 spaces and 80 with because stories also used in documentation
			files: ['*.stories.ts', '*.stories.tsx'],
			options: {
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
			},
		},
		{
			files: ['*.gql', '.*.graphql'],
			options: {
				parser: 'graphql',
			},
		},
		{
			files: ['*.md'],
			options: {
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
				parser: 'markdown',
			},
		},
		{
			files: ['*.mdx'],
			options: {
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
				parser: 'mdx',
			},
		},
		{
			files: ['*.html'],
			options: {
				parser: 'html',
			},
		},
		{
			files: ['*.yml', '*.yaml'],
			options: {
				useTabs: false,
				tabWidth: 2,
				parser: 'yaml',
			},
		},
	],
};
