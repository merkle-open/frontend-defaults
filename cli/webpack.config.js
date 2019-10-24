const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = {
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
    },
    resolve: {
        alias: {
            // override any-observable in listr because it uses require in runtime
            'any-observable': path.resolve('./src/observable.js')
        },
    },
	output: {
		filename: `index.js`,
		library: 'frontend-defaults-cli',
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	plugins: [
		// Cleans the dist folder before the build starts
		new CleanWebpackPlugin(),
		// Multi threading typescript loader configuration with caching for .ts and .tsx files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
		new TsConfigWebpackPlugin(),
	],
};
