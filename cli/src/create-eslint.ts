/**
 *
 * This file produces eslint files and changes required for
 *
 * 		JS + eslint
 *
 * for Typescript please check typescript-eslint
 */

import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const createEslintFile = async ({
	ts,
	eslint,
	prettier,
}: IOptions): Promise<{ '.eslintrc.js'?: string; '.eslintrc.strict.js'?: string }> => {
	if (ts || !eslint) {
		return {};
	}

	if (prettier) {
		const template = await fetchTemplate('eslint', '.eslintrc-prettier.js');
		const templateStrict = await fetchTemplate('eslint', '.eslintrc-prettier.strict.js');
		return {
			'.eslintrc.js': template,
			'.eslintrc.strict.js': templateStrict,
		};
	}

	const template = await fetchTemplate('eslint', '.eslintrc.js');
	const templateStrict = await fetchTemplate('eslint', '.eslintrc.strict.js');
	return {
		'.eslintrc.js': template,
		'.eslintrc.strict.js': templateStrict,
	};
};

const createEslintignoreFile = async ({ ts, eslint }: IOptions): Promise<{ '.eslintignore'?: string }> => {
	if (ts || !eslint) {
		return {};
	}

	const template = await fetchTemplate('eslint', '.eslintignore');
	return {
		'.eslintignore': template,
	};
};

const updatePackageJson = async ({ ts, githooks, eslint }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (ts || !eslint) {
		return {};
	}

	let packageJson = await fetchTemplateJson('eslint', 'package.json');

	if (githooks) {
		packageJson = deepMerge(packageJson, await fetchTemplateJson('eslint', 'package-githooks.json'));
	}

	return {
		'package.json': packageJson,
	};
};

export const create = async (options: IOptions) => ({
	...(await createEslintFile(options)),
	...(await createEslintignoreFile(options)),
	...(await updatePackageJson(options)),
});
