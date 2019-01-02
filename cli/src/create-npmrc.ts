import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';

import { getCwd } from './get-cwd';
import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const cwd = getCwd();

const create = async ({ npmrc, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.npmrc')))) {
		task.skip('.npmrc exist (use --force to override)');
		return;
	}

	if (!npmrc) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.npmrc'), await fetchTemplate('npmrc', '.npmrc'));
};

export const listr = (options: IOptions) => {
	if (!options.npmrc) {
		return [];
	}

	return {
		title: 'Npmrc',
		task: () => {
			return new Listr([
				{
					title: 'write npmrc file',
					task: async (ctx, task) => {
						return Promise.all([create(options, task), wait()]);
					},
				},
			]);
		},
	};
};

export default create;
