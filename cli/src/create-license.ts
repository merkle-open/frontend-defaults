import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';
import deepMerge from 'deepmerge';

import { getCwd } from './get-cwd';
import { fetchPackage } from './fetch-package';
import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const cwd = getCwd();

const createLicense = async ({ license, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, 'LICENSE')))) {
		task.skip('LICENSE exist (use --force to override)');
		return;
	}

	if (typeof license !== 'string' || license === '') {
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'LICENSE'),
		(await fetchTemplate('license', 'LICENSE'))
			.replace('COPYRIGHT_YEAR', new Date().getFullYear().toString())
			.replace('COPYRIGHT_HOLDER', license)
	);
};

const updatePackageJson = async ({ license, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, 'LICENSE')))) {
		task.skip('LICENSE exist (use --force to override)');
		return;
	}

	if (typeof license !== 'string' || license === '') {
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(
			deepMerge(await fetchPackage(), {
				license: 'MIT',
				author: license,
				contributors: [],
			}),
			null,
			2
		)
	);
};

export const listr = (options: IOptions) => {
	if (typeof options.license !== 'string' || options.license === '') {
		return [];
	}

	return {
		title: 'License',
		task: () => {
			return new Listr([
				{
					title: 'write license file',
					task: async (ctx, task) => {
						return Promise.all([createLicense(options, task), wait()]);
					},
				},
				{
					title: 'add license and author to package.json',
					task: async (ctx, task) => {
						return Promise.all([updatePackageJson(options, task), wait()]);
					},
				},
			]);
		},
	};
};
