import { prompt } from 'enquirer';
import chalk from 'chalk';

import { IOptions } from './fetch-options';
import { getCwd } from './get-cwd';
import { IMergedFiles } from './merge-files';
import {
	getPackageJson,
	getLanguage,
	getTslint,
	getEslint,
	getProjectConfigs,
	getLinters,
	getWebpack,
	getInstall,
	getLicense,
} from './prompts';

const cwd = getCwd();

export const TYPE_CHOICES = {
	ts: 'typescript' as 'typescript',
	tslint: 'tslint' as 'tslint',
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

export const fetchSurvey = async (): Promise<IOptions> => {
	const answers = {
		...(await getLicense()),
		...(await getPackageJson(cwd)),
		...(await getLanguage()),
		...(await getTslint(await getLanguage())),
		...(await getEslint(await getLanguage())),
		...(await getProjectConfigs()),
		...(await getLinters()),
		...(await getWebpack()),
		...(await getInstall()),
	};

	const {
		language,
		license,
		copyrightHolder,
		tslint = false,
		eslint = false,
		project = [],
		linters = [],
		webpack,
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
		tslint,
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
		install,
		force: false,
		dryRun: false,

		mode: 'survey',
	};
};
