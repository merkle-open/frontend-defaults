import path from 'path';
import fs from 'fs-extra';
import deepMerge from 'deepmerge';
import execa from 'execa';
import Listr from 'listr';
import stringify from 'json-stable-stringify';

import { IOptions } from './fetch-options';
import { wait } from './wait';
import { fetchPackage } from './fetch-package';
import { fetchTemplateJson } from './fetch-template';

const updatePackageJson = async ({ cwd }: IOptions) => {
	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(deepMerge(await fetchPackage(cwd), await fetchTemplateJson('install', 'package.json')), null, 2)
	);
};

const cleanPackageJson = async ({ cwd }: IOptions) => {
	await fs.writeFile(path.join(cwd, 'package.json'), stringify(await fetchPackage(cwd), { space: '  ' }));
};

export const install = async ({ install, cwd }: IOptions) => {
	if (!install) {
		return;
	}

	try {
		await execa('npm', ['i'], {
			cwd,
		});
	} catch (err) {
		throw new Error(err);
	}

	return;
};

export const listr = (options: IOptions) => {
	if (!options.install) {
		return {
			title: 'npm-run-all and clean package.json',
			task: () => {
				return new Listr([
					{
						title: 'add npm-run-all to package.json',
						task: async () => {
							return Promise.all([updatePackageJson(options), wait()]);
						},
					},
					{
						title: 'clean package.json',
						task: async () => {
							return Promise.all([cleanPackageJson(options), wait()]);
						},
					},
				]);
			},
		};
	}

	return {
		title: 'Install',
		task: () => {
			return new Listr([
				{
					title: 'add npm-run-all to package.json',
					task: async () => {
						return Promise.all([updatePackageJson(options), wait()]);
					},
				},
				{
					title: 'clean package.json',
					task: async () => {
						return Promise.all([cleanPackageJson(options), wait()]);
					},
				},
				{
					title: 'execute npm install',
					task: async () => {
						return Promise.all([install(options), wait()]);
					},
				},
			]);
		},
	};
};
