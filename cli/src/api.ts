import Listr from 'listr';
import chalk from 'chalk';
import execa from 'execa';

import { IOptions } from './fetch-options';
import { existPackage } from './exist-package';
import { getCwd } from './get-cwd';

import { listr as readmeListr } from './create-readme';
import { listr as licenseListr } from './create-license';
import { listr as editorconfListr } from './create-editorconfig';
import { listr as gitignoreListr } from './create-gitignore';
import { listr as nodenvListr } from './create-nodenv';
import { listr as npmrcListr } from './create-npmrc';

import { listr as prettierListr } from './create-prettier';
import { listr as tslintListr } from './create-tslint';
import { listr as tsconfigListr } from './create-tsconfig';
import { listr as stylelintListr } from './create-stylelint';
import { listr as commitlintListr } from './create-commitlint';
import { listr as eslintListr } from './create-eslint';

import { listr as webpackListr } from './create-webpack';
import { listr as installListr } from './install';

export interface IApiOptions {
	cwd?: string;

	// details
	ts?: boolean;
	tslint?: boolean;
	es?: boolean;
	eslint?: boolean;
	editorconfig?: boolean;
	prettier?: boolean;
	stylelint?: boolean;
	license?: string;
	gitignore?: boolean;
	npmrc?: boolean;
	readme?: boolean;
	githooks?: boolean;
	commitlint?: boolean;
	nodenv?: boolean;
	webpack?: boolean;

	install?: boolean;
	force?: boolean;
}

const cwd = getCwd();

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
};

export default async (apiOptions: IApiOptions) => {
	const options: IOptions = {
		cwd,
		...defaultApiOptions,
		...apiOptions,
	};

	if (!(await existPackage()) && !options.force) {
		console.error(
			chalk.red('\npackage.json is missing. Please create it by executing `$npm init` or add --force\n\n')
		);
		process.exit(1);
	}

	const tasks = new Listr(
		([] as Listr.ListrTask[]).concat(
			readmeListr(options),
			licenseListr(options),
			editorconfListr(options),
			gitignoreListr(options),
			nodenvListr(options),
			npmrcListr(options),

			commitlintListr(options),
			prettierListr(options),
			stylelintListr(options),
			tsconfigListr(options),
			tslintListr(options),
			eslintListr(options),

			webpackListr(options),
			installListr(options)
		),
		{
			collapse: false,
		} as any
	);

	tasks
		.run()
		.then(async () => {
			try {
				if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci') {
					return;
				}
				await execa('code', ['.']);
			} catch (err) {
				// tslint:disable-next-line
			}
		})
		.catch((err) => {
			console.error(err);
		});
};
