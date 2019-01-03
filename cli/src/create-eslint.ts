import path from 'path';
import fs from 'fs-extra';
import deepMerge from 'deepmerge';
import Listr, { ListrTaskWrapper } from 'listr';

import { fetchPackage } from './fetch-package';
import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const createEslintFile = async ({ cwd, eslint, prettier, force }: IOptions, task: ListrTaskWrapper) => {
	if (!eslint) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, '.eslintrc.js')))) {
		task.skip('.eslintrc.js exist (use --force to override)');
		return;
	}

	if (prettier) {
		await fs.writeFile(path.join(cwd, '.eslintrc.js'), await fetchTemplate('eslint', '.eslintrc-prettier.js'));
		return;
	}

	await fs.writeFile(path.join(cwd, '.eslintrc.js'), await fetchTemplate('eslint', '.eslintrc.js'));
};
const createEslintignoreFile = async ({ cwd, eslint, force }: IOptions, task: ListrTaskWrapper) => {
	if (!eslint) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, '.eslintignore')))) {
		task.skip('.eslintignore exist (use --force to override)');
		return;
	}

	await fs.writeFile(path.join(cwd, '.eslintignore'), await fetchTemplate('eslint', '.eslintignore'));
};

const updatePackageJson = async ({ cwd, githooks, eslint, force }: IOptions, task: ListrTaskWrapper) => {
	if (!eslint) {
		return;
	}

	if (
		!force &&
		((await existFile(path.join(cwd, '.eslintrc.js'))) || (await existFile(path.join(cwd, '.eslintignore'))))
	) {
		task.skip('.eslintrc.js or .eslintignore exist (use --force to override)');
		return;
	}

	if (githooks) {
		await fs.writeFile(
			path.join(cwd, 'package.json'),
			JSON.stringify(
				deepMerge(await fetchPackage(cwd), await fetchTemplateJson('eslint', 'package-githooks.json')),
				null,
				2
			)
		);
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(deepMerge(await fetchPackage(cwd), await fetchTemplateJson('eslint', 'package.json')), null, 2)
	);
};

export const listr = (options: IOptions) => {
	if (!options.eslint) {
		return [];
	}

	return {
		title: 'Eslint',
		task: () => {
			return new Listr([
				{
					title: 'write eslint file',
					task: async (ctx, task) => {
						return Promise.all([createEslintFile(options, task), wait()]);
					},
				},
				{
					title: 'write eslintignore file',
					task: async (ctx, task) => {
						return Promise.all([createEslintignoreFile(options, task), wait()]);
					},
				},
				{
					title: 'add eslint to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
