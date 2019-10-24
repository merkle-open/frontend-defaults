import chalk from 'chalk';
import ora from './ora-facade';

import { create as createReadme } from './create-readme';
import { create as createLicense } from './create-license';
import { create as createEditorconf } from './create-editorconfig';
import { create as createGitignore } from './create-gitignore';
import { create as createNodeVersion } from './create-node-version';
import { create as createGithooks } from './create-githooks';
import { create as createNpmrc } from './create-npmrc';

import { create as createPrettier } from './create-prettier';
import { create as createTypescriptEslint } from './create-typescript-eslint';
import { create as createTsconfig } from './create-tsconfig';
import { create as createStylelint } from './create-stylelint';
import { create as createCommitlint } from './create-commitlint';
import { create as createLicenseChecker } from './create-license-checker';
import { create as createEslint } from './create-eslint';

import { create as createWebpack } from './create-webpack';
import { create as createBuild } from './create-build';
import { create as createInstall } from './install';

import { sortPackageJson } from './sort-package-json';
import { fetchOriginalFiles } from './fetch-original-files';
import { mergeFiles } from './merge-files';
import { IPackageJson } from './type-package-json';
import deepMerge from './deep-merge';
import { IOptions } from './const';

export const collectChanges = async (options: IOptions) => {
	const spinnerCollectChanges = ora('Collect changes').start();

	const changes1 = deepMerge(
		{ 'package.json': options.packageJson ? options.packageJson : undefined },
		await createReadme(options),
		await createLicense(options),
		await createEditorconf(options),
		await createGitignore(options),
		await createNodeVersion(options),
		await createGithooks(options),
		await createNpmrc(options),
		await createPrettier(options),
		await createTypescriptEslint(options),
		await createTsconfig(options),
		await createStylelint(options),
		await createCommitlint(options),
		await createLicenseChecker(options),
		await createEslint(options),
		await createWebpack(options, spinnerCollectChanges),
		await createBuild(options)
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
