/// <reference types="@types/jest" />
jest.mock('latest-version');

import 'jest';
import path from 'path';
import fs from 'fs-extra';
import rimraf from 'rimraf';

import api, { IApiOptions } from '../src/api';

jest.mock('latest-version', () => ({
	__esModule: true,
	default: jest.fn().mockReturnValue('0.1.0-mock'),
}));

const cwd = process.cwd();

const deleteDir = (pathName: string) => new Promise((resolve) => rimraf(pathName, resolve));
const removeIgnoredFiles = (fileName: string) => fileName !== '.DS_Store' && fileName !== 'Thumbs.db';

export const apiIt = async (tmpPathName: string, options: IApiOptions, shouldDeleteDir: boolean = true) => {
	const tmpPathRoot = path.join(cwd, '__tests__', 'tmp');
	const tmpPath = path.join(tmpPathRoot, tmpPathName);
	options.cwd = tmpPath;
	if (options.force === undefined) {
		options.force = true;
	}

	jest.setTimeout(10000);
	await deleteDir(tmpPath);
	try {
		await fs.mkdir(tmpPathRoot);
	} catch (err) {}
	await fs.mkdir(tmpPath);

	await api(options);

	const files = (await fs.readdir(tmpPath))
		.filter((dirName: string) => !fs.statSync(path.join(tmpPath, dirName)).isDirectory())
		.filter(removeIgnoredFiles)
		.sort();

	let i = 0;
	for (i = 0; i < files.length; i += 1) {
		const fileData = await fs.readFile(path.join(tmpPath, files[i]), 'utf8');
		expect(fileData).toMatchSnapshot();
	}

	// normalize pathes to look the same on windows, linux and mac
	expect.addSnapshotSerializer({
		test: (val) => typeof val === 'string',
		print(val) {
			return `${val.replace(/\\/g, '/')}`;
		},
	});
	expect(files).toMatchSnapshot();
};
