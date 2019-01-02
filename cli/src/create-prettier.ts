import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';

import deepMerge from 'deepmerge';
import { getCwd } from './get-cwd';
import { fetchPackage } from './fetch-package';
import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const cwd = getCwd();

const createPrettieringoreFile = async ({ prettier, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.prettierignore')))) {
		task.skip('.prettierignore exist (use --force to override)');
		return;
	}

	if (!prettier) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.prettierignore'), await fetchTemplate('prettier', '.prettierignore'));
};

const createPrittierrcFile = async ({ prettier, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.prettierrc.js')))) {
		task.skip('.prettierrc.js exist (use --force to override)');
		return;
	}

	if (!prettier) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.prettierrc.js'), await fetchTemplate('prettier', '.prettierrc.js'));
};

const updatePackageJson = async ({ prettier, githooks, force }: IOptions, task: ListrTaskWrapper) => {
	if (
		!force &&
		((await existFile(path.join(cwd, '.prettierrc.js'))) || (await existFile(path.join(cwd, '.prettierignore'))))
	) {
		task.skip('.prettierrc.js or .prettierignore exist (use --force to override)');
		return;
	}

	if (!prettier) {
		return;
	}

	if (githooks) {
		await fs.writeFile(
			path.join(cwd, 'package.json'),
			JSON.stringify(
				deepMerge(await fetchPackage(), await fetchTemplateJson('prettier', 'package-githooks.json')),
				null,
				2
			)
		);
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(deepMerge(await fetchPackage(), await fetchTemplateJson('prettier', 'package.json')), null, 2)
	);
};

export const listr = (options: IOptions) => {
	if (!options.prettier) {
		return [];
	}

	return {
		title: 'Prettier',
		task: () => {
			return new Listr([
				{
					title: 'write prettierignore file',
					task: async (ctx, task) => {
						return Promise.all([createPrettieringoreFile(options, task), wait()]);
					},
				},
				{
					title: 'write prettierrc file',
					task: async (ctx, task) => {
						return Promise.all([createPrittierrcFile(options, task), wait()]);
					},
				},
				{
					title: 'add prettier to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
