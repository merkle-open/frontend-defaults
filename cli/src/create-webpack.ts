import path from 'path';
import chalk from 'chalk';
import latestVersion from 'latest-version';
import { generateConfigurations } from 'generate-webpack-config';
import { Ora } from 'ora';
import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const createWebpackConfigFile = async (
	webpackConfig: string,
	{ webpack }: IOptions
): Promise<{ 'webpack.config.js'?: string; 'src/index.ts'?: string; 'src/index.js'?: string }> => {
	if (!webpack) {
		return {};
	}

	// TODO remove replace after this issue is fixed https://github.com/namics/webpack-config-plugins/issues/65
	return {
		'webpack.config.js': webpackConfig
			.replace('const CleanWebpackPlugin =', 'const { CleanWebpackPlugin } =')
			.replace("new CleanWebpackPlugin(['dist'])", 'new CleanWebpackPlugin()'),
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
		const result = {
			[path.join('src', 'wait.ts')]: await fetchTemplate('webpack', 'wait.ts'),
			[path.join('src', 'index.ts')]: await fetchTemplate('webpack', 'index.ts'),
			[path.join('src', 'polyfill.ts')]: await fetchTemplate('webpack', 'polyfill.ts'),
			[path.join('src', 'styles.scss')]: await fetchTemplate('webpack', 'styles.scss'),
		};
		return result;
	}

	const result = {
		[path.join('src', 'wait.js')]: await fetchTemplate('webpack', 'wait.js'),
		[path.join('src', 'index.js')]: await fetchTemplate('webpack', 'index.js'),
		[path.join('src', 'styles.scss')]: await fetchTemplate('webpack', 'styles.scss'),
	};
	return result;
};

const createBabelConfigFile = async ({ webpack, ts }: IOptions): Promise<{ 'babel.config.js'?: string }> => {
	if (!webpack || ts) {
		return {};
	}

	const template = await fetchTemplate('webpack', 'babel.config.js');
	return {
		'babel.config.js': template,
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
	const devDependencies: { [key: string]: string } = {};
	let i = 0;

	try {
		for (i = 0; i < npmInstallSpl.length; i += 1) {
			devDependencies[npmInstallSpl[i]] = await latestVersion(npmInstallSpl[i], { version: 'latest' });
		}
	} catch (err) {
		oraSpinner.fail(chalk.red('Cannot fetch dependency version, maybe offline!'));
		process.exit(1);
	}

	const template = await fetchTemplateJson('webpack', 'package.json');
	let packageData = deepMerge(template, { devDependencies });

	if (ts) {
		const templateCoreJs = await fetchTemplateJson('webpack', 'package-core-js.json');
		return {
			'package.json': deepMerge(packageData, templateCoreJs),
		};
	}

	const templateBabel = await fetchTemplateJson('webpack', 'package-babel.json');
	return { 'package.json': deepMerge(packageData, templateBabel) };
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
