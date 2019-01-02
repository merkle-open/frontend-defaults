import 'jest';
import path from 'path';
import execa from 'execa';
import fs from 'fs-extra';
import rimraf from 'rimraf';

const cwd = process.cwd();

const deleteDir = (pathName: string) => new Promise((resolve) => rimraf(pathName, resolve));
const removeIgnoredFiles = (fileName: string) => fileName !== '.DS_Store' && fileName !== 'Thumbs.db';

export const defaultIt = async (tmpPathName: string, cmd: string) => {
	const tmpPath = path.join(cwd, tmpPathName);
	await deleteDir(tmpPath);
	await fs.mkdir(tmpPath);
	await execa.shell(`../bin/index.js ${cmd}`, {
		cwd: tmpPath,
	});
	const files = (await fs.readdir(tmpPath))
		.filter((dirName: string) => !fs.statSync(path.join(tmpPath, dirName)).isDirectory())
		.filter(removeIgnoredFiles);

	let i = 0;
	for (i = 0; i < files.length; i += 1) {
		const fileData = await fs.readFile(path.join(tmpPath, files[i]), 'utf8');
		expect(fileData).toMatchSnapshot();
	}
	await deleteDir(tmpPath);
};
