/// <reference types="@types/jest" />
import enquirer from 'enquirer';

import { fetchSurvey } from '../src/fetch-survey';
import { getCwd } from '../src/get-cwd';
import { TYPE_CHOICES } from '../src/const';
const cwd = getCwd();

jest.mock('enquirer');

describe('enqirer', () => {
	it('es', async () => {
		enquirer.prompt = jest.fn().mockResolvedValue({
			license: TYPE_CHOICES.licenseClosedSource,
			packageJson: {
				result: `{
					"name": "test",
					"description": "test",
					"author": "author",
					"version": "0.1.0"
				}`,
			},
			language: TYPE_CHOICES.es,
			eslint: true,
			project: [
				TYPE_CHOICES.readme,
				TYPE_CHOICES.editorconfig,
				TYPE_CHOICES.npmrc,
				TYPE_CHOICES.nodeVersion,
				TYPE_CHOICES.gitignore,
				TYPE_CHOICES.githooks,
			],
			linters: [TYPE_CHOICES.prettier, TYPE_CHOICES.stylelint, TYPE_CHOICES.commitlint],
			webpack: true,
			install: true,
		});

		expect({
			...(await fetchSurvey(cwd)),
			cwd: undefined,
			packageJson: undefined,
		}).toEqual({
			cwd: undefined,
			packageJson: undefined,
			copyrightHolder: undefined,
			commitlint: true,
			dryRun: false,
			editorconfig: true,
			es: true,
			eslint: true,
			force: false,
			githooks: true,
			gitignore: true,
			install: true,
			license: TYPE_CHOICES.licenseClosedSource,
			mode: 'survey',
			nodeVersion: true,
			npmrc: true,
			prettier: true,
			readme: true,
			stylelint: true,
			ts: false,
			webpack: true,
			build: false,
		});
	});
});
