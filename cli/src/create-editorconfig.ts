import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';

import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const createEditorconfig = async ({ cwd, editorconfig, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, '.editorconfig')))) {
		task.skip('.editorconfig exist (use --force to override)');
		return;
	}

	if (!editorconfig) {
		return;
	}

	await fs.writeFile(path.join(cwd, '.editorconfig'), await fetchTemplate('editorconfig', '.editorconfig'));
};

export const listr = (options: IOptions) => {
	if (!options.editorconfig) {
		return [];
	}

	return {
		title: 'Editorconfig',
		task: () => {
			return new Listr([
				{
					title: 'write editorconfig file',
					task: async (ctx, task) => {
						return Promise.all([createEditorconfig(options, task), wait()]);
					},
				},
			]);
		},
	};
};
