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

	return {
		'webpack.config.js': webpackConfig,
	};
};

const createDemoFiles = async ({
	ts,
	webpack,
}: IOptions): Promise<{ 'src/index.ts'?: string; 'src/polyfill.ts'?: string; 'src/index.js'?: string }> => {
	if (!webpack) {
		return {};
	}

	if (ts) {
		return {
			[path.join('src', 'wait.ts')]: await fetchTemplate('webpack', 'wait.ts'),
			[path.join('src', 'index.ts')]: await fetchTemplate('webpack', 'index.ts'),
			[path.join('src', 'polyfill.ts')]: await fetchTemplate('webpack', 'polyfill.ts'),
		};
	}

	return {
		[path.join('src', 'wait.js')]: await fetchTemplate('webpack', 'wait.js'),
		[path.join('src', 'index.js')]: await fetchTemplate('webpack', 'index.js'),
	};
};

const createBabelConfigFile = async ({ webpack, ts }: IOptions): Promise<{ 'babel.config.js'?: string }> => {
	if (!webpack || ts) {
		return {};
	}

	return {
		'babel.config.js': await fetchTemplate('webpack', 'babel.config.js'),
	};
};

const updatePackageJson = async (
	npmInstall: string,
	{ webpack, ts }: IOptions,
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

	let packageData = deepMerge(await fetchTemplateJson('webpack', 'package.json'), { devDependencies });

	if (ts) {
		return {
			'package.json': deepMerge(packageData, await fetchTemplateJson('webpack', 'package-core-js.json')),
		};
	}

	return { 'package.json': deepMerge(packageData, await fetchTemplateJson('webpack', 'package-babel.json')) };
};

export const create = async (options: IOptions, oraSpinner: Ora) => {
	if (!options.webpack) {
		return {};
	}

	const { webpackConfig, npmInstall } = generateConfigurations({
		useJs: options.es,
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
		...(await createBabelConfigFile(options)),
		...(await createDemoFiles(options)),
		...(await updatePackageJson(npmInstall, options, oraSpinner)),
	};
};
