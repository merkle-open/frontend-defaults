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

const createTsconfigFile = async ({ ts, force }: IOptions, task: ListrTaskWrapper) => {
	if (!ts) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, 'tsconfig.json')))) {
		task.skip('tsconfig.json exist (use --force to override)');
		return;
	}

	await fs.writeFile(path.join(cwd, 'tsconfig.json'), await fetchTemplate('tsconfig', 'tsconfig.json'));
};
const updatePackageJson = async ({ ts, force }: IOptions, task: ListrTaskWrapper) => {
	if (!ts) {
		return;
	}

	if (!force && (await existFile(path.join(cwd, 'tsconfig.json')))) {
		task.skip('tsconfig.json exist (use --force to override)');
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(deepMerge(await fetchPackage(), await fetchTemplateJson('tsconfig', 'package.json')), null, 2)
	);
};

export const listr = (options: IOptions) => {
	if (!options.ts) {
		return [];
	}

	return {
		title: 'Tsconfig',
		task: () => {
			return new Listr([
				{
					title: 'write tsconfig file',
					task: async (ctx, task) => {
						return Promise.all([createTsconfigFile(options, task), wait()]);
					},
				},
				{
					title: 'add typescript to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
