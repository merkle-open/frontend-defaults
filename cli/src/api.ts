import { IOptions, TMode } from './fetch-options';
import { getCwd } from './get-cwd';

import { install, openVSCode, storeOptionsAndChanges } from './install';
import { showDiff } from './log-diff';
import { writeFiles } from './write-files';
import { fetchSurveyFiles } from './fetch-survey';
import { collectChanges } from './collect-changes';

export interface IApiOptions {
	cwd?: string;
	packageJson?: string;

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
	nodenv?: boolean;
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
	nodenv: false,
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

	const { originalFiles, mergedFiles } = await collectChanges(options);
	const shouldContinue = await showDiff(originalFiles, mergedFiles, options);
	if (!shouldContinue) {
		return;
	}
	const files = await fetchSurveyFiles(mergedFiles, options);
	await writeFiles(files, mergedFiles, options);
	await storeOptionsAndChanges(options, mergedFiles);
	await install(options);
	await openVSCode(options);
};
