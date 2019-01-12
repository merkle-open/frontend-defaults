import path from 'path';
import fs from 'fs-extra';
import execa from 'execa';
import chalk from 'chalk';
import ora from 'ora';

import { getCwd } from './get-cwd';
import { IOptions } from './fetch-options';
import { fetchTemplateJson } from './fetch-template';
import { IMergedFiles } from './merge-files';
import { fetchPackage } from './fetch-package';
import { IPackageJson } from './type-package-json';

const updatePackageJson = async <P>({ cwd }: IOptions, changes: P): Promise<{ 'package.json'?: IPackageJson }> => {
	const packageDataScripts: { [script: string]: string } = {
		...(((await fetchPackage(cwd)) || {}).scripts || {}),
		...((changes['package.json'] || {}).scripts || {}),
	};

	if (
		!Object.keys(packageDataScripts)
			.join(',')
			.includes('lint:')
	) {
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

	spinnerInstall.succeed();

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

export const create = async <P>(options: IOptions, changes: P) => ({
	...(await updatePackageJson(options, changes)),
});
