import chalk from 'chalk';
import semver from 'semver';
import { prompt } from 'enquirer';

import { promptCache } from './prompt-cache';
import { TYPE_CHOICES, TLanguage } from './fetch-survey';
import { existPackage } from './exist-package';
import { IPackageJson } from './type-package-json';
import { templatePackageSnippet } from './template-package-snippet';

const getChoice = (name: string, value?: string) => ({
	name,
	value: value || name,
	message: value || name,
});

export const getPackageJson = promptCache(
	async (cwd: string): Promise<{ packageJson?: IPackageJson }> => {
		if (await existPackage(cwd)) {
			return {};
		}

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

		return {
			packageJson: JSON.parse(packageJson.result.replace(/\n/g, '')),
		};
	}
);

export const getLanguage = promptCache(async () => {
	return await prompt<{ language: TLanguage }>({
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
	});
});

export const getTslint = promptCache(
	async ({ language }: { language: string }): Promise<{ tslint?: boolean }> => {
		if (language !== TYPE_CHOICES.ts) {
			return {};
		}

		return await prompt<{ tslint: boolean }>({
			type: 'confirm',
			name: 'tslint',
			message: 'Do you want to use tslint',
			initial: true,
		});
	}
);

export const getEslint = promptCache(
	async ({ language }: { language: string }): Promise<{ eslint?: boolean }> => {
		if (language !== TYPE_CHOICES.es) {
			return {};
		}

		return await prompt<{ eslint: boolean }>({
			type: 'confirm',
			name: 'eslint',
			message: 'Do you want to use eslint',
			initial: true,
		});
	}
);

export const getProjectConfigs = promptCache(
	async (): Promise<{ project?: string[] }> => {
		return await prompt<{ project: string[] }>({
			type: 'multiselect',
			name: 'project',
			message: 'Select project defaults \n',
			initial: [0, 2, 3, 4, 5, 6],
			choices: [
				getChoice(TYPE_CHOICES.readme),
				getChoice(TYPE_CHOICES.licenseMIT, 'MIT license'),
				getChoice(TYPE_CHOICES.editorconfig),
				getChoice(TYPE_CHOICES.npmrc),
				getChoice(TYPE_CHOICES.nodeVersion),
				getChoice(TYPE_CHOICES.gitignore),
				getChoice(TYPE_CHOICES.githooks),
			],
		});
	}
);

export const getLinters = promptCache(
	async (): Promise<{ linters?: string[] }> => {
		return await prompt<{ linters: string[] }>({
			type: 'multiselect',
			name: 'linters',
			message: 'Select autoformatter and additional linters \n',
			initial: [0, 1, 2],
			choices: [
				getChoice(TYPE_CHOICES.prettier),
				getChoice(TYPE_CHOICES.stylelint),
				getChoice(TYPE_CHOICES.commitlint),
			],
		});
	}
);

export const getWebpack = promptCache(
	async (): Promise<{ webpack: boolean }> => {
		return await prompt<{ webpack: boolean }>({
			type: 'confirm',
			name: 'webpack',
			message: 'Do you want to use webpack',
			initial: true,
		});
	}
);

export const getInstall = promptCache(
	async (): Promise<{ install: boolean }> => {
		return await prompt<{ install: boolean }>({
			type: 'confirm',
			name: 'install',
			message: 'Do you want to run install afterwards',
			initial: true,
		});
	}
);
