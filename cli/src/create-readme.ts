import path from 'path';
import fs from 'fs-extra';
import Listr, { ListrTaskWrapper } from 'listr';

import { getCwd } from './get-cwd';
import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { existFile } from './exist-file';

const cwd = getCwd();

const createReadme = async ({ readme, force }: IOptions, task: ListrTaskWrapper) => {
	if (!force && (await existFile(path.join(cwd, 'README.md')))) {
		task.skip('README.md exist (use --force to override)');
		return;
	}

	if (!readme) {
		return;
	}

	await fs.writeFile(
		path.join(cwd, 'README.md'),
		(await fetchTemplate('readme', 'README.md')).replace('PROJECT_NAME', path.basename(cwd))
	);
};

export const listr = (options: IOptions) => {
	if (!options.readme) {
		return [];
	}

	return {
		title: 'Readme',
		task: () => {
			return new Listr([
				{
					title: 'write readme file',
					task: async (ctx, task) => {
						return Promise.all([createReadme(options, task), wait()]);
					},
				},
			]);
		},
	};
};
