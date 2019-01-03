import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';
import deepMerge from 'deepmerge';

import { fetchPackage } from './fetch-package';
import { fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';

const updatePackageJson = async ({ cwd, commitlint, force }: IOptions, task: ListrTaskWrapper) => {
	if (
		!force &&
		(await fs.readFile(path.join(cwd, 'package.json'), 'utf8')).includes(
			'@namics/commitlint-conventional-changelog'
		)
	) {
		task.skip('commitlint is already installed (use --force to override)');
		return;
	}

	if (!commitlint) {
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(
			deepMerge(await fetchPackage(cwd), await fetchTemplateJson('commitlint', 'package.json')),
			null,
			2
		)
	);
};

export const listr = (options: IOptions) => {
	if (!options.commitlint) {
		return [];
	}

	return {
		title: 'Commitlint',
		task: () => {
			return new Listr([
				{
					title: 'add commitlint and commitizen to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
