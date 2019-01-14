import 'jest';
import enquirer from 'enquirer';

import { fetchSurvey, TYPE_CHOICES } from '../src/fetch-survey';

jest.mock('enquirer');

describe('enqirer', async () => {
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
			tslint: false,
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
			...(await fetchSurvey()),
			cwd: undefined,
			packageJson: undefined,
		}).toEqual({
			cwd: undefined,
			packageJson: undefined,
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
			tslint: false,
			webpack: true,
		});
	});
});
