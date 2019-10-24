import path from 'path';
import fs from 'fs-extra';
import { IFiles } from './merge-files';

const existFile = async (pathName: string) => {
	try {
		const stat = await fs.stat(pathName);
		return stat.isFile();
	} catch (err) {}
	return false;
};

export const fetchOriginalFiles = async (cwd: string, changes: { [key: string]: any }): Promise<IFiles> => {
	let original: { [key: string]: string } = {};
	const files = Object.keys(changes);
	let i = 0;

	for (i = 0; i < files.length; i += 1) {
		const filePath = path.join(cwd, files[i]);
		const doesFileExist = await existFile(filePath);
		if (doesFileExist) {
			original[files[i]] = await fs.readFile(filePath, 'utf8');
		}
	}

	if (original['package.json']) {
		original['package.json'] = JSON.parse(original['package.json']);
	}

	return original;
};
