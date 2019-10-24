import execa from 'execa';
import chalk from 'chalk';

import ora from './ora-facade';
import { fetchTemplateJson } from './fetch-template';
import { fetchPackage } from './fetch-package';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const updatePackageJson = async <P>({ cwd }: IOptions, changes: P): Promise<{ 'package.json'?: IPackageJson }> => {
	const packageDataScripts: { [script: string]: string } = {
		...(((await fetchPackage(cwd)) || {}).scripts || {}),
		...(((changes as any)['package.json'] || {}).scripts || {}),
	};

	if (
		!Object.keys(packageDataScripts)
			.join(',')
			.includes('lint:')
	) {
		return {};
	}

	const template = await fetchTemplateJson('install', 'package.json');
	return {
		'package.json': template,
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

export const create = async <P>(options: IOptions, changes: P) => ({
	...(await updatePackageJson(options, changes)),
});
