import path from 'path';
import fs from 'fs-extra';
import deepMerge from 'deepmerge';
import Listr, { ListrTaskWrapper } from 'listr';

import { fetchPackage } from './fetch-package';
import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const createStylelintConfigFile = async ({ cwd, stylelint, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, 'stylelint.config.js')))) {
		task.skip('stylelint.config.js exist (use --force to override)');
		return;
	}

	if (!stylelint) {
		return;
	}

	await fs.writeFile(path.join(cwd, 'stylelint.config.js'), await fetchTemplate('stylelint', 'stylelint.config.js'));
};
const createStylelintIgnoreFile = async ({ cwd, stylelint, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.stylelintignore')))) {
		task.skip('.stylelintignore exist (use --force to override)');
		return;
	}

	if (!stylelint) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.stylelintignore'), await fetchTemplate('stylelint', '.stylelintignore'));
};
const updatePackageJson = async ({ cwd, stylelint, githooks, force }: IOptions, task: ListrTaskWrapper) => {
	if (
		!force &&
		((await existFile(path.join(cwd, 'stylelint.config.js'))) ||
			(await existFile(path.join(cwd, '.stylelintignore'))))
	) {
		task.skip('.stylelintignore or stylelint.config.js exist (use --force to override)');
		return;
	}

	if (!stylelint) {
		return;
	}

	if (githooks) {
		await fs.writeFile(
			path.join(cwd, 'package.json'),
			JSON.stringify(
				deepMerge(await fetchPackage(cwd), await fetchTemplateJson('stylelint', 'package-githooks.json')),
				null,
				2
			)
		);
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(
			deepMerge(await fetchPackage(cwd), await fetchTemplateJson('stylelint', 'package.json')),
			null,
			2
		)
	);
};

export const listr = (options: IOptions) => {
	if (!options.stylelint) {
		return [];
	}

	return {
		title: 'Stylelint',
		task: () => {
			return new Listr([
				{
					title: 'write stylelint.config.js file',
					task: async (ctx, task) => {
						return Promise.all([createStylelintConfigFile(options, task), wait()]);
					},
				},
				{
					title: 'write stylelintignore file',
					task: async (ctx, task) => {
						return Promise.all([createStylelintIgnoreFile(options, task), wait()]);
					},
				},
				{
					title: 'add stylelint to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
