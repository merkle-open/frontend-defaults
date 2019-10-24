import { prompt } from 'enquirer';
import chalk from 'chalk';

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
import { TYPE_CHOICES, IOptions } from './const';

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
