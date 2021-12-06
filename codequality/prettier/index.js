module.exports = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	endOfLine: 'auto',
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	overrides: [
		{
			files: ['*.gql', '*.graphql'],
			options: {
				parser: 'graphql',
			},
		},
		{
			files: ['*.js', '*.jsx'],
			options: {
				parser: 'babel',
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
				parser: 'markdown',
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
			},
		},
		{
			files: '*.mdx',
			options: {
				parser: 'mdx',
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			options: {
				parser: 'typescript',
			},
		},
		{
			// use 2 spaces and 80 with because stories also used in documentation
			files: ['*.stories.ts', '*.stories.tsx'],
			options: {
				parser: 'typescript',
				useTabs: false,
				tabWidth: 2,
				printWidth: 60,
			},
		},
		{
			files: ['*.yml', '*.yaml'],
			options: {
				parser: 'yaml',
				singleQuote: false,
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
