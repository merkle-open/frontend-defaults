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

	const files = await api(options);
	expect(files).toMatchSnapshot();
};
