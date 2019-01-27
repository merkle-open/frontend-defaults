module.exports = {
	plugins: [
		[
			require.resolve('@babel/plugin-proposal-decorators'),
			{
				"legacy": true
			},
		],
		[
			require.resolve('@babel/plugin-syntax-dynamic-import'),
		],
	],
	presets: [
		[
			require.resolve('@babel/preset-react'),
		],
		[
			require.resolve('@babel/preset-env'),
			{
				useBuiltIns: 'entry'
			},
		],
	],
};
