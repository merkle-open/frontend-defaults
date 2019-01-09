import path from 'path';
import chalk from 'chalk';
import latestVersion from 'latest-version';
import { generateConfigurations } from 'generate-webpack-config';
import { Ora } from 'ora';

import { IOptions } from './fetch-options';
import { fetchTemplate } from './fetch-template';

const createWebpackConfigFile = async (
	webpackConfig: string,
	{ ts, webpack }: IOptions
): Promise<{ [key: string]: any }> => {
	if (!webpack) {
		return {};
	}

	return {
		[path.join('src', ts ? 'index.ts' : 'index.js')]: await fetchTemplate('webpack', 'index.js'),
		'webpack.config.js': webpackConfig,
	};
};

const updatePackageJson = async (
	npmInstall: string,
	{ webpack }: IOptions,
	oraSpinner: Ora
): Promise<{ [key: string]: any }> => {
	if (!webpack) {
		return {};
	}

	const npmInstallSpl = npmInstall.trim().split(' ');
	const devDependencies = {};
	let i = 0;

	try {
		for (i = 0; i < npmInstallSpl.length; i += 1) {
			devDependencies[npmInstallSpl[i]] = await latestVersion(npmInstallSpl[i], { version: 'latest' });
		}
	} catch (err) {
		oraSpinner.fail(chalk.red('Cannot fetch dependency version, maybe offline!'));
		process.exit(1);
	}

	return {
		'package.json': {
			scripts: {
				build: 'webpack --mode production',
				start: 'webpack-dev-server --mode development',
			},
			devDependencies,
		},
	};
};

export const create = async (options: IOptions, oraSpinner: Ora): Promise<{ [key: string]: any }> => {
	if (!options.webpack) {
		return {};
	}

	const { webpackConfig, npmInstall } = generateConfigurations({
		useJs: true,
		useTs: options.ts,
		useScss: true,
		useCss: true,
		useFonts: true,
		useImages: true,
		useHtml: true,
		useClean: true,
		useDevServer: true,
		useCli: true,
	});

	return {
		...(await createWebpackConfigFile(webpackConfig, options)),
		...(await updatePackageJson(npmInstall, options, oraSpinner)),
	};
};
