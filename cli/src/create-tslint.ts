import path from 'path';
import fs from 'fs-extra';
import deepMerge from 'deepmerge';
import Listr, { ListrTaskWrapper } from 'listr';

import { getCwd } from './get-cwd';
import { fetchPackage } from './fetch-package';
import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const cwd = getCwd();

const createTslintFile = async ({ tslint, force }: IOptions, task: ListrTaskWrapper) => {
	if (!tslint) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, 'tslint.json')))) {
		task.skip('tslint.json exist (use --force to override)');
		return;
	}

	await fs.writeFile(path.join(cwd, 'tslint.json'), await fetchTemplate('tslint', 'tslint.json'));
};
const updatePackageJson = async ({ githooks, tslint, force }: IOptions, task: ListrTaskWrapper) => {
	if (!tslint) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, 'tslint.json')))) {
		task.skip('tslint.json exist (use --force to override)');
		return;
	}

	if (githooks) {
		await fs.writeFile(
			path.join(cwd, 'package.json'),
			JSON.stringify(
				deepMerge(await fetchPackage(), await fetchTemplateJson('tslint', 'package-githooks.json')),
				null,
				2
			)
		);
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(deepMerge(await fetchPackage(), await fetchTemplateJson('tslint', 'package.json')), null, 2)
	);
};

export const listr = (options: IOptions) => {
	if (!options.tslint) {
		return [];
	}

	return {
		title: 'Tslint',
		task: () => {
			return new Listr([
				{
					title: 'write tslint file',
					task: async (ctx, task) => {
						return Promise.all([createTslintFile(options, task), wait()]);
					},
				},
				{
					title: 'add tslint to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
