import chalk from 'chalk';
import ora from 'ora';

import { create as createReadme } from './create-readme';
import { create as createLicense } from './create-license';
import { create as createEditorconf } from './create-editorconfig';
import { create as createGitignore } from './create-gitignore';
import { create as createNodeVersion } from './create-node-version';
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
import deepMerge from './deep-merge';

export const collectChanges = async (options: IOptions) => {
	const spinnerCollectChanges = ora('Collect changes').start();

	const changes1 = deepMerge(
		{ 'package.json': options.packageJson ? options.packageJson : undefined },
		await createReadme(options),
		await createLicense(options),
		await createEditorconf(options),
		await createGitignore(options),
		await createNodeVersion(options),
		await createNpmrc(options),
		await createPrettier(options),
		await createTslint(options),
		await createTsconfig(options),
		await createStylelint(options),
		await createCommitlint(options),
		await createEslint(options),
		await createWebpack(options, spinnerCollectChanges)
	);

	const changes = deepMerge(changes1, await createInstall<typeof changes1>(options, changes1));

	const originalFiles = await fetchOriginalFiles(options.cwd, changes);
	const mergedFiles = mergeFiles(originalFiles, changes);

	if (Object.keys(mergedFiles).length <= 0) {
		spinnerCollectChanges.stop();
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
