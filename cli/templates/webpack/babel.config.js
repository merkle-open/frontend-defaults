module.exports = {
	presets: [
		[
			require.resolve('@babel/preset-env'),
			{
				useBuiltIns: 'entry'
			},
		],
		[
			require.resolve('@babel/preset-react'),
		]
	],
};
