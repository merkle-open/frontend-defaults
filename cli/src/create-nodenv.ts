import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';

import { getCwd } from './get-cwd';
import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const cwd = getCwd();

const createNodeVersionFile = async ({ nodenv, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.node-version')))) {
		task.skip('.node-version exist (use --force to override)');
		return;
	}

	if (!nodenv) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.node-version'), await fetchTemplate('node-version', '.node-version'));
};
const createHuskyrcFile = async ({ githooks, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.huskyrc')))) {
		task.skip('.huskyrc exist (use --force to override)');
		return;
	}

	if (!githooks) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.huskyrc'), await fetchTemplate('node-version', '.huskyrc'));
};

export const listr = (options: IOptions) => {
	const tasks = [] as Listr.ListrTask[];

	if (options.nodenv) {
		tasks.push({
			title: 'write .node-version file',
			task: async (ctx, task) => {
				return Promise.all([createNodeVersionFile(options, task), wait()]);
			},
		});
	}
	if (options.githooks) {
		tasks.push({
			title: 'write .huskyrc file',
			task: async (ctx, task) => {
				return Promise.all([createHuskyrcFile(options, task), wait()]);
			},
		});
	}

	if (tasks.length <= 0) {
		return [];
	}

	return {
		title: 'Nodenv',
		task: () => {
			return new Listr(tasks);
		},
	};
};
