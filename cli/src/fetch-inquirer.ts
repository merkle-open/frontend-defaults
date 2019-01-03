import inquirer, { objects } from 'inquirer';
import { IOptions } from './fetch-options';

type IChoiceOption = objects.ChoiceOption;

const TYPE_CHOICES = {
	ts: 'typescript' as 'typescript',
	tslint: 'tslint' as 'tslint',
	es: 'javascript' as 'javascript',
	eslint: 'eslint' as 'eslint',

	readme: 'readme' as 'readme',
	license: 'license' as 'license',
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
	license?: string;
}

const getChoice = (name: string, checked: boolean = true) => ({
	name,
	checked,
});

export const fetchInquirer = async (): Promise<IOptions> => {
	const { language, tslint, eslint, project, linters, webpack, install, force, license } = (await inquirer.prompt([
		{
			type: 'list',
			name: 'language',
			message: 'Select prefered language',
			choices: [
				{
					name: TYPE_CHOICES.ts,
					checked: true,
				},
				{
					name: TYPE_CHOICES.es,
					checked: false,
				},
			],
		},
		{
			type: 'confirm',
			name: 'tslint',
			message: 'Do you want to use tslint',
			default: true,
			when: ({ language }: IAnswers) => language === TYPE_CHOICES.ts,
		},
		{
			type: 'confirm',
			name: 'eslint',
			message: 'Do you want to use eslint',
			default: true,
			when: ({ language }: IAnswers) => language === TYPE_CHOICES.es,
		},
		{
			type: 'checkbox',
			name: 'project',
			message: 'Select project defaults \n',
			choices: [
				getChoice(TYPE_CHOICES.readme),
				getChoice(TYPE_CHOICES.license),
				getChoice(TYPE_CHOICES.editorconfig),
				getChoice(TYPE_CHOICES.npmrc),
				getChoice(TYPE_CHOICES.nodenv),
				getChoice(TYPE_CHOICES.gitignore),
				getChoice(TYPE_CHOICES.githooks),
			] as IChoiceOption[],
		},
		{
			type: 'input',
			name: 'license',
			message: 'Please enter the license copyright holder',
			when: ({ project }: IAnswers) => project.includes(TYPE_CHOICES.license),
			validate: (value: string) => Boolean(typeof value === 'string' && value !== ''),
		},
		{
			type: 'checkbox',
			name: 'linters',
			message: 'Select autoformatter and additional linters \n',
			choices: [
				getChoice(TYPE_CHOICES.prettier),
				getChoice(TYPE_CHOICES.stylelint),
				getChoice(TYPE_CHOICES.commitlint),
			] as IChoiceOption[],
		},
		{
			type: 'confirm',
			name: 'webpack',
			message: 'Do you want to use webpack',
			default: true,
		},
		{
			type: 'confirm',
			name: 'force',
			message: 'Do you want to overwrite existing configurations',
			default: true,
		},
		{
			type: 'confirm',
			name: 'install',
			message: 'Do you want to run install afterwards',
			default: true,
		},
	])) as IAnswers;

	return {
		ts: language === TYPE_CHOICES.ts,
		es: language === TYPE_CHOICES.es,
		tslint,
		eslint,

		editorconfig: project.includes(TYPE_CHOICES.editorconfig),
		license,
		gitignore: project.includes(TYPE_CHOICES.gitignore),
		npmrc: project.includes(TYPE_CHOICES.npmrc),
		readme: project.includes(TYPE_CHOICES.readme),
		githooks: project.includes(TYPE_CHOICES.githooks),
		nodenv: project.includes(TYPE_CHOICES.nodenv),

		commitlint: linters.includes(TYPE_CHOICES.commitlint),
		prettier: linters.includes(TYPE_CHOICES.editorconfig),
		stylelint: linters.includes(TYPE_CHOICES.stylelint),

		webpack,
		install,
		force,
	};
};
