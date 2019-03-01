import path from 'path';
import fs from 'fs-extra';
import { IFiles } from './merge-files';

const existFile = async (pathName: string) => {
	try {
		return (await fs.stat(pathName)).isFile();
	} catch (err) {}
	return false;
};

export const fetchOriginalFiles = async (cwd: string, changes: { [key: string]: any }): Promise<IFiles> => {
	let original = {};
	const files = Object.keys(changes);
	let i = 0;

	for (i = 0; i < files.length; i += 1) {
		const filePath = path.join(cwd, files[i]);
		if (await existFile(filePath)) {
			original[files[i]] = await fs.readFile(filePath, 'utf8');
		}
	}

	if (original['package.json']) {
		original['package.json'] = JSON.parse(original['package.json']);
	}

	return original;
};
