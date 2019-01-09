import fs from 'fs-extra';
import path from 'path';
import Listr from 'listr';
import makeDir from 'make-dir';

import { IMergedFiles } from './merge-files';
import { wait } from './wait';
import { IOptions } from './fetch-options';

const writeFile = async (pathName: string, data: string | object) => {
	await makeDir(path.join(pathName.replace(path.basename(pathName), '')));
	await fs.writeFile(pathName, typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};

export const writeFiles = async (files: string[], mergedFiles: IMergedFiles, { cwd }: IOptions) => {
	const tasks = new Listr(
		files.map((file: string) => ({
			title: file,
			task: () => Promise.all([writeFile(path.join(cwd, file), mergedFiles[file].data), wait()]),
		})),
		{
			concurrent: 3,
		}
	);

	return await tasks.run();
};
