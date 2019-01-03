import Listr from 'listr';
import chalk from 'chalk';
import execa from 'execa';

import { fetchOptions } from './fetch-options';
import { existPackage } from './exist-package';

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

(async () => {
	const options = await fetchOptions();

	if (!(await existPackage()) && !options.force) {
		console.error(
			chalk.red('\npackage.json is missing. Please create it by executing `$npm init` or add --force\n\n')
		);
		process.exit(1);
	}

	const tasks = new Listr(
		([] as Listr.ListrTask[]).concat(
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
})();
