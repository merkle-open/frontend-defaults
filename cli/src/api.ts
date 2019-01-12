import { IOptions, TMode } from './fetch-options';
import { getCwd } from './get-cwd';

import { install, openVSCode, storeOptionsAndChanges } from './install';
import { showDiff } from './log-diff';
import { writeFiles } from './write-files';
import { fetchSurveyFiles } from './fetch-survey';
import { collectChanges } from './collect-changes';
import chalk from 'chalk';
import { IPackageJson } from './type-package-json';
import { gitInit } from './git-init';

export interface IApiOptions {
	cwd?: string;
	packageJson?: IPackageJson;

	// details
	ts?: boolean;
	tslint?: boolean;
	es?: boolean;
	eslint?: boolean;
	editorconfig?: boolean;
	prettier?: boolean;
	stylelint?: boolean;
	licenseMIT?: string;
	gitignore?: boolean;
	npmrc?: boolean;
	readme?: boolean;
	githooks?: boolean;
	commitlint?: boolean;
	nodeVersion?: boolean;
	webpack?: boolean;

	install?: boolean;
	force?: boolean;

	mode: TMode;
}

const defaultApiOptions = {
	// details
	ts: false,
	tslint: false,
	es: false,
	eslint: false,
	editorconfig: false,
	prettier: false,
	stylelint: false,
	gitignore: false,
	npmrc: false,
	readme: false,
	githooks: false,
	commitlint: false,
	nodeVersion: false,
	webpack: false,

	install: false,
	force: false,
	dryRun: false,

	mode: 'api',
};

export default async (apiOptions: IApiOptions) => {
	const cwd = getCwd();
	const options: IOptions = {
		cwd,
		...defaultApiOptions,
		...apiOptions,
	};

	// enable githooks always with commitlint
	if (options.commitlint) {
		options.githooks = true;
	}

	try {
		const { originalFiles, mergedFiles } = await collectChanges(options);
		const shouldContinue = await showDiff(originalFiles, mergedFiles, options);
		if (!shouldContinue) {
			return;
		}
		const files = await fetchSurveyFiles(mergedFiles, options);
		await writeFiles(files, mergedFiles, options);
		await storeOptionsAndChanges(options, mergedFiles);
		await gitInit(options.cwd);
		await install(options);
		await openVSCode(options);
	} catch (err) {
		console.error(chalk.red(err));
		process.exit(1);
	}
};
