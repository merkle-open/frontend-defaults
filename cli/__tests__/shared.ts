import 'jest';
import path from 'path';
import execa from 'execa';
import fs from 'fs-extra';
import rimraf from 'rimraf';
import api, { IApiOptions } from '../build/api';

const cwd = process.cwd();

const deleteDir = (pathName: string) => new Promise((resolve) => rimraf(pathName, resolve));
const removeIgnoredFiles = (fileName: string) => fileName !== '.DS_Store' && fileName !== 'Thumbs.db';

export const defaultIt = async (tmpPathName: string, cmd: string, shouldDeleteDir: boolean = true) => {
	const tmpPathRoot = path.join(cwd, '__tests__', 'tmp');
	const tmpPath = path.join(tmpPathRoot, tmpPathName);

	jest.setTimeout(10000);
	await deleteDir(tmpPath);
	try {
		await fs.mkdir(tmpPathRoot);
	} catch (err) {}
	await fs.mkdir(tmpPath);
	await execa.shell(`../../../bin/index.js ${cmd}`, {
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
	if (shouldDeleteDir) {
		await deleteDir(tmpPath);
	}
};

export const apiIt = async (tmpPathName: string, options: IApiOptions, shouldDeleteDir: boolean = true) => {
	const tmpPathRoot = path.join(cwd, '__tests__', 'tmp');
	const tmpPath = path.join(tmpPathRoot, tmpPathName);
	options.cwd = tmpPath;

	jest.setTimeout(10000);
	await deleteDir(tmpPath);
	try {
		await fs.mkdir(tmpPathRoot);
	} catch (err) {}
	await fs.mkdir(tmpPath);

	const files = (await fs.readdir(tmpPath))
		.filter((dirName: string) => !fs.statSync(path.join(tmpPath, dirName)).isDirectory())
		.filter(removeIgnoredFiles)
		.sort();

	await api(options);

	let i = 0;
	for (i = 0; i < files.length; i += 1) {
		const fileData = await fs.readFile(path.join(tmpPath, files[i]), 'utf8');
		expect(fileData).toMatchSnapshot();
	}

	if (shouldDeleteDir) {
		await deleteDir(tmpPath);
	}
};
