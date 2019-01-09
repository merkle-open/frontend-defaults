import { prompt } from 'enquirer';
import semver from 'semver';
import chalk from 'chalk';

import { IOptions } from './fetch-options';
import { getCwd } from './get-cwd';
import { templatePackageSnippet } from './template-package-snippet';
import { existPackage } from './exist-package';
import { IMergedFiles } from './merge-files';

const cwd = getCwd();

const TYPE_CHOICES = {
	ts: 'typescript' as 'typescript',
	tslint: 'tslint' as 'tslint',
	es: 'javascript' as 'javascript',
	eslint: 'eslint' as 'eslint',

	readme: 'readme' as 'readme',
	licenseMIT: 'licenseMIT' as 'licenseMIT',
	editorconfig: 'editorconfig' as 'editorconfig',
	npmrc: 'npmrc' as 'npmrc',
	nodenv: 'nodenv' as 'nodenv',
	gitignore: 'gitignore' as 'gitignore',
	githooks: 'githooks' as 'githooks',

	prettier: 'prettier' as 'prettier',
	stylelint: 'stylelint' as 'stylelint',
	commitlint: 'commitlint' as 'commitlint',

	webpack: 'webpack' as 'webpack',
	install: 'install' as 'install',
	force: 'force' as 'force',
};

interface IAnswers {
	language: typeof TYPE_CHOICES.ts | typeof TYPE_CHOICES.es;
	tslint: boolean;
	eslint: boolean;
	project: string[];
	linters: string[];
	webpack: boolean;
	install: boolean;
	force: boolean;
	packageJson: string;
	licenseMIT?: string;
}

const getChoice = (name: string, value?: string) => ({
	name,
	value: value || name,
	message: value || name,
});

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
	const existPackageJson = await existPackage(cwd);
	let answers = {} as IAnswers;

	if (!existPackageJson) {
		const { packageJson } = await prompt<{ packageJson: { result: string } }>({
			type: 'snippet',
			name: 'packageJson',
			message: 'Fill out the fields in package.json',
			required: true,
			fields: [
				{
					name: 'author_name',
					message: 'Author Name',
				},
				{
					name: 'version',
					validate(value: string, _state: any, item: any) {
						if (item && item.name === 'version' && !semver.valid(value)) {
							return chalk.red('version should be a valid semver value');
						}
						return true;
					},
				},
			],
			template: templatePackageSnippet,
		} as any);
		Object.assign(answers, {
			packageJson: JSON.parse(packageJson.result.replace(/\n/g, '')),
		});
	}

	Object.assign(
		answers,
		await prompt<{ language: string }>({
			type: 'select',
			name: 'language',
			message: 'Select prefered language',
			choices: [
				{
					name: TYPE_CHOICES.ts,
				},
				{
					name: TYPE_CHOICES.es,
				},
			],
		})
	);

	if (answers.language === TYPE_CHOICES.ts) {
		Object.assign(
			answers,
			await prompt<{ tslint: boolean }>({
				type: 'confirm',
				name: 'tslint',
				message: 'Do you want to use tslint',
				initial: true,
			})
		);
	}

	if (answers.language === TYPE_CHOICES.es) {
		Object.assign(
			answers,
			await prompt<{ eslint: boolean }>({
				type: 'confirm',
				name: 'eslint',
				message: 'Do you want to use eslint',
				initial: true,
			})
		);
	}

	Object.assign(
		answers,
		await prompt({
			type: 'multiselect',
			name: 'project',
			message: 'Select project defaults \n',
			initial: [0, 2, 3, 4, 5, 6],
			choices: [
				getChoice(TYPE_CHOICES.readme),
				getChoice(TYPE_CHOICES.licenseMIT, 'MIT license'),
				getChoice(TYPE_CHOICES.editorconfig),
				getChoice(TYPE_CHOICES.npmrc),
				getChoice(TYPE_CHOICES.nodenv),
				getChoice(TYPE_CHOICES.gitignore),
				getChoice(TYPE_CHOICES.githooks),
			],
		})
	);

	Object.assign(
		answers,
		await prompt({
			type: 'multiselect',
			name: 'linters',
			message: 'Select autoformatter and additional linters \n',
			initial: [0, 1, 2],
			choices: [
				getChoice(TYPE_CHOICES.prettier),
				getChoice(TYPE_CHOICES.stylelint),
				getChoice(TYPE_CHOICES.commitlint),
			],
		})
	);

	Object.assign(
		answers,
		await prompt({
			type: 'confirm',
			name: 'webpack',
			message: 'Do you want to use webpack',
			initial: true,
		})
	);

	Object.assign(
		answers,
		await prompt({
			type: 'confirm',
			name: 'install',
			message: 'Do you want to run install afterwards',
			initial: true,
		})
	);

	const { language, tslint, eslint, project, linters, webpack, install, force, licenseMIT, packageJson } = answers;

	return {
		cwd,
		packageJson,

		ts: language === TYPE_CHOICES.ts,
		es: language === TYPE_CHOICES.es,
		tslint,
		eslint,

		editorconfig: project.includes(TYPE_CHOICES.editorconfig),
		licenseMIT,
		gitignore: project.includes(TYPE_CHOICES.gitignore),
		npmrc: project.includes(TYPE_CHOICES.npmrc),
		readme: project.includes(TYPE_CHOICES.readme),
		githooks: project.includes(TYPE_CHOICES.githooks),
		nodenv: project.includes(TYPE_CHOICES.nodenv),

		commitlint: linters.includes(TYPE_CHOICES.commitlint),
		prettier: linters.includes(TYPE_CHOICES.prettier),
		stylelint: linters.includes(TYPE_CHOICES.stylelint),

		webpack,
		install,
		force,
		dryRun: false,

		mode: 'survey',
	};
};
