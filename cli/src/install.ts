import path from 'path';
import fs from 'fs-extra';
import execa from 'execa';
import chalk from 'chalk';
import ora from 'ora';

import { getCwd } from './get-cwd';
import { IOptions } from './fetch-options';
import { fetchTemplateJson } from './fetch-template';
import { IMergedFiles } from './merge-files';

const updatePackageJson = async ({  }: IOptions, changes: object): Promise<{ [key: string]: any }> => {
	if (!changes['package.json'] || !changes['package.json'].data || !changes['package.json'].data.scipts) {
		return {};
	}

	const packageData = JSON.parse(changes['package.json'].data);

	if (!packageData || !packageData.scipts) {
		return {};
	}

	const scripts = JSON.stringify(changes['package.json'].data.scipts, null, 2);
	if (!scripts.includes('lint:')) {
		return {};
	}

	return {
		'package.json': await fetchTemplateJson('install', 'package.json'),
	};
};

export const install = async ({ install, cwd }: IOptions) => {
	if (!install) {
		return;
	}

	const spinnerInstall = ora('Installing').start();

	try {
		if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci') {
			return;
		}
		await execa('npm', ['i'], {
			cwd,
		});
		spinnerInstall.stop();
	} catch (err) {
		spinnerInstall.fail('Installation failed');
		console.error(chalk.red(err));
		process.exit(1);
	}

	return;
};

export const openVSCode = async ({ cwd }: IOptions) => {
	try {
		if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci') {
			return;
		}
		await execa('code', ['.'], {
			cwd,
		});
	} catch (err) {
		console.error(chalk.red(err));
		process.exit(1);
	}
};

export const storeOptionsAndChanges = async (options: IOptions, mergedFiles: IMergedFiles) => {
	try {
		const cwd = getCwd();
		await fs.writeFile(
			path.join(options.cwd || cwd, '.frontend-defaults-rc.json'),
			JSON.stringify(
				{
					options: {
						...options,
						cwd: undefined,
					},
					mergedFiles,
				},
				null,
				2
			)
		);
	} catch (err) {
		console.error(chalk.red(err));
		process.exit(1);
	}
};

export const create = async (options: IOptions, changes: object) => ({
	...updatePackageJson(options, changes),
});
