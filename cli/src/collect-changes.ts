import chalk from 'chalk';
import ora from 'ora';
import deepMerge from 'deepmerge';

import { create as createReadme } from './create-readme';
import { create as createLicense } from './create-license';
import { create as createEditorconf } from './create-editorconfig';
import { create as createGitignore } from './create-gitignore';
import { create as createNodenv } from './create-nodenv';
import { create as createNpmrc } from './create-npmrc';

import { create as createPrettier } from './create-prettier';
import { create as createTslint } from './create-tslint';
import { create as createTsconfig } from './create-tsconfig';
import { create as createStylelint } from './create-stylelint';
import { create as createCommitlint } from './create-commitlint';
import { create as createEslint } from './create-eslint';

import { create as createWebpack } from './create-webpack';
import { create as createInstall } from './install';

import { sortPackageJson } from './sort-package-json';
import { IOptions } from './fetch-options';
import { fetchOriginalFiles } from './fetch-original-files';
import { mergeFiles } from './merge-files';
import { IPackageJson } from './type-package-json';

export const collectChanges = async (options: IOptions) => {
	const spinnerCollectChanges = ora('Collect changes').start();

	let changes = {};

	if (options.packageJson) {
		changes['package.json'] = options.packageJson;
	}

	changes = deepMerge(changes, await createReadme(options));
	changes = deepMerge(changes, await createLicense(options));
	changes = deepMerge(changes, await createEditorconf(options));
	changes = deepMerge(changes, await createGitignore(options));
	changes = deepMerge(changes, await createNodenv(options));
	changes = deepMerge(changes, await createNpmrc(options));
	changes = deepMerge(changes, await createPrettier(options));
	changes = deepMerge(changes, await createTslint(options));
	changes = deepMerge(changes, await createTsconfig(options));
	changes = deepMerge(changes, await createStylelint(options));
	changes = deepMerge(changes, await createCommitlint(options));
	changes = deepMerge(changes, await createEslint(options));
	changes = deepMerge(changes, await createWebpack(options, spinnerCollectChanges));
	changes = deepMerge(changes, await createInstall(options, changes));

	const originalFiles = await fetchOriginalFiles(options.cwd, changes);
	const mergedFiles = mergeFiles(originalFiles, changes);

	if (Object.keys(mergedFiles).length <= 0) {
		console.log(chalk.red('\n  No changes required!\n'));
		process.exit(1);
	}

	if (mergedFiles['package.json'] && mergedFiles['package.json'].data) {
		sortPackageJson(mergedFiles['package.json'].data as IPackageJson);
	}

	spinnerCollectChanges.stop();

	return {
		originalFiles,
		mergedFiles,
	};
};
