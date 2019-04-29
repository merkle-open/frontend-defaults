import { prompt } from 'enquirer';
import chalk from 'chalk';

import { IOptions } from './fetch-options';
import { IMergedFiles } from './merge-files';
import {
	getPackageJson,
	getLanguage,
	getEslint,
	getTypescriptEslint,
	getProjectConfigs,
	getLinters,
	getWebpack,
	getBuild,
	getInstall,
	getLicense,
} from './prompts';

export const TYPE_CHOICES = {
	ts: 'typescript' as 'typescript',
	es: 'javascript' as 'javascript',
	eslint: 'eslint' as 'eslint',

	readme: 'readme' as 'readme',
	licenseOpenSource: 'licenseOpenSource' as 'licenseOpenSource',
	licenseClosedSource: 'licenseClosedSource' as 'licenseClosedSource',
	editorconfig: 'editorconfig' as 'editorconfig',
	npmrc: 'npmrc' as 'npmrc',
	nodeVersion: 'nodeVersion' as 'nodeVersion',
	gitignore: 'gitignore' as 'gitignore',
	githooks: 'githooks' as 'githooks',

	prettier: 'prettier' as 'prettier',
	stylelint: 'stylelint' as 'stylelint',
	commitlint: 'commitlint' as 'commitlint',

	webpack: 'webpack' as 'webpack',
	install: 'install' as 'install',
	force: 'force' as 'force',
};

export type TLanguage = typeof TYPE_CHOICES.ts | typeof TYPE_CHOICES.es;
export type TLicense = typeof TYPE_CHOICES.licenseOpenSource | typeof TYPE_CHOICES.licenseClosedSource | undefined;

export const fetchSurveyFiles = async (mergedFiles: IMergedFiles, options: IOptions) => {
	const filesChoices = Object.keys(mergedFiles).map((fileName) => ({
		message: `${fileName}${chalk.red(mergedFiles[fileName].override ? ' (override)' : '')}`,
		name: fileName,
	}));

	let files: string[] = [];

	if (options.mode === 'survey') {
		const filesAnswer = (await prompt({
			type: 'multiselect',
			name: 'files',
			message: 'Select files to write on harddisk \n',
			initial: Array.apply(null, new Array(filesChoices.length)).map((_x: any, index: number) => index),
			choices: filesChoices,
		})) as { files: string[] };
		files = filesAnswer.files;
	} else {
		files = Object.keys(mergedFiles);
	}

	return files.sort();
};

export const fetchSurvey = async (cwd: string): Promise<IOptions> => {
	const answers = {
		...(await getLicense()),
		...(await getPackageJson(cwd)),
		...(await getLanguage()),
		...(await getEslint(await getLanguage())),
		...(await getTypescriptEslint(await getLanguage())),
		...(await getProjectConfigs()),
		...(await getLinters()),
		...(await getWebpack()),
		...(await getBuild(await getWebpack())),
		...(await getInstall()),
	};

	const {
		language,
		license,
		copyrightHolder,
		eslint = false,
		project = [],
		linters = [],
		webpack,
		build,
		install,
		packageJson,
	} = answers;

	return {
		cwd,
		packageJson,
		license,
		copyrightHolder,

		ts: language === TYPE_CHOICES.ts,
		es: language === TYPE_CHOICES.es,
		eslint,

		editorconfig: project.includes(TYPE_CHOICES.editorconfig),
		gitignore: project.includes(TYPE_CHOICES.gitignore),
		npmrc: project.includes(TYPE_CHOICES.npmrc),
		readme: project.includes(TYPE_CHOICES.readme),
		githooks: project.includes(TYPE_CHOICES.githooks),
		nodeVersion: project.includes(TYPE_CHOICES.nodeVersion),

		commitlint: linters.includes(TYPE_CHOICES.commitlint),
		prettier: linters.includes(TYPE_CHOICES.prettier),
		stylelint: linters.includes(TYPE_CHOICES.stylelint),

		webpack,
		build,
		install,
		force: false,
		dryRun: false,

		mode: 'survey',
	};
};
