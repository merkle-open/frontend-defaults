import path from 'path';
import chalk from 'chalk';
import latestVersion from 'latest-version';
import { generateConfigurations } from 'generate-webpack-config';
import { Ora } from 'ora';
import deepMerge from 'deepmerge';

import { IOptions } from './fetch-options';
import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';

const createWebpackConfigFile = async (
	webpackConfig: string,
	{ ts, webpack }: IOptions
): Promise<{ 'webpack.config.js'?: string; 'src/index.ts'?: string; 'src/index.js'?: string }> => {
	if (!webpack) {
		return {};
	}

	const indexFileName = ts ? 'index.ts' : 'index.js';

	return {
		[path.join('src', indexFileName)]: await fetchTemplate('webpack', indexFileName),
		'webpack.config.js': webpackConfig,
	};
};

const createBabelrcConfigFile = async ({ webpack }: IOptions): Promise<{ '.babelrc'?: string }> => {
	if (!webpack) {
		return {};
	}

	return {
		'.babelrc': await fetchTemplate('webpack', '.babelrc'),
	};
};

const updatePackageJson = async (
	npmInstall: string,
	{ webpack }: IOptions,
	oraSpinner: Ora
): Promise<{ 'package.json'?: IPackageJson }> => {
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
		'package.json': deepMerge(await fetchTemplateJson('webpack', 'package.json'), { devDependencies }),
	};
};

export const create = async (options: IOptions, oraSpinner: Ora) => {
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
		...(await createBabelrcConfigFile(options)),
		...(await updatePackageJson(npmInstall, options, oraSpinner)),
	};
};
