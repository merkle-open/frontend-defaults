import path from 'path';
import fs from 'fs-extra';
import deepMerge from 'deepmerge';
import latestVersion from 'latest-version';
import Listr, { ListrTaskWrapper } from 'listr';
import { generateConfigurations } from 'generate-webpack-config';

import { getCwd } from './get-cwd';
import { fetchPackage } from './fetch-package';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';
import { fetchTemplate } from './fetch-template';

const cwd = getCwd();

const createWebpackConfigFile = async (
	webpackConfig: string,
	{ ts, webpack, force }: IOptions,
	task: ListrTaskWrapper
) => {
	if (!webpack) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, 'webpack.config.js')))) {
		task.skip('webpack.config.js exist (use --force to override)');
		return;
	}

	const pathIndexFile = path.join(cwd, 'src', ts ? 'index.ts' : 'index.js');

	if (!(await existFile(pathIndexFile))) {
		await fs.mkdir(path.join(cwd, 'src'));
		await fs.writeFile(pathIndexFile, await fetchTemplate('webpack', 'index.js'));
	}

	await fs.writeFile(path.join(cwd, 'webpack.config.js'), webpackConfig);
};
const updatePackageJson = async (npmInstall: string, { webpack, force }: IOptions, task: ListrTaskWrapper) => {
	if (!webpack) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, 'webpack.config.js')))) {
		task.skip('webpack.config.js exist (use --force to override)');
		return;
	}

	const npmInstallSpl = npmInstall.trim().split(' ');
	const devDependencies = {};
	let i = 0;

	for (i = 0; i < npmInstallSpl.length; i += 1) {
		devDependencies[npmInstallSpl[i]] = await latestVersion(npmInstallSpl[i], { version: 'latest' });
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(
			deepMerge(await fetchPackage(), {
				scripts: {
					build: 'webpack --mode production',
					start: 'webpack-dev-server --mode development',
				},
				devDependencies,
			}),
			null,
			2
		)
	);
};

export const listr = (options: IOptions) => {
	if (!options.webpack) {
		return [];
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
		title: 'Webpack config (webpack-config-plugins)',
		task: () => {
			return new Listr([
				{
					title: 'write webpack.config.js file',
					task: async (ctx, task) => {
						return Promise.all([createWebpackConfigFile(webpackConfig, options, task), wait()]);
					},
				},
				{
					title: 'add webpack-config-plugins dependencies to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(npmInstall, options, task), wait()]);
					},
				},
			]);
		},
	};
};
