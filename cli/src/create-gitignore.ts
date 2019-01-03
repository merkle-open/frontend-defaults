import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';

import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const createGitignoreFile = async ({ cwd, gitignore, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.gitignore')))) {
		task.skip('.gitignore exist (use --force to override)');
		return;
	}

	if (!gitignore) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.gitignore'), await fetchTemplate('gitignore', '.gitignore'));
};
const createGitattributesFile = async ({ cwd, gitignore, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.gitattributes')))) {
		task.skip('.gitattributes exist (use --force to override)');
		return;
	}

	if (!gitignore) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.gitattributes'), await fetchTemplate('gitignore', '.gitattributes'));
};

export const listr = (options: IOptions) => {
	if (!options.gitignore) {
		return [];
	}

	return {
		title: 'Gitignore & Gitattributes',
		task: () => {
			return new Listr([
				{
					title: 'write gitignore file',
					task: async (ctx, task) => {
						return Promise.all([createGitignoreFile(options, task), wait()]);
					},
				},
				{
					title: 'write gitattributes file',
					task: async (ctx, task) => {
						return Promise.all([createGitattributesFile(options, task), wait()]);
					},
				},
			]);
		},
	};
};
