import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createEslintFile = async ({ eslint, ts, prettier }: IOptions): Promise<{ '.eslintrc.js'?: string, '.eslintrc.strict.js'?: string }> => {
	if (!ts || !eslint) {
		return {};
	}

	if (prettier) {
		return {
			'.eslintrc.js': await fetchTemplate('typescript-eslint', '.eslintrc-prettier.js'),
			'.eslintrc.strict.js': await fetchTemplate('typescript-eslint', '.eslintrc-prettier.strict.js'),
		};
	}

	return {
		'.eslintrc.js': await fetchTemplate('typescript-eslint', '.eslintrc.js'),
		'.eslintrc.strict.js': await fetchTemplate('typescript-eslint', '.eslintrc.strict.js'),
	};
};

const createEslintignoreFile = async ({ ts, eslint }: IOptions): Promise<{ '.eslintignore'?: string }> => {
	if (!ts || !eslint) {
		return {};
	}

	return {
		'.eslintignore': await fetchTemplate('typescript-eslint', '.eslintignore'),
	};
};

const updatePackageJson = async ({ githooks, ts, eslint }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!ts || !eslint) {
		return {};
	}

	let packageJson = await fetchTemplateJson('typescript-eslint', 'package.json');

	if (githooks) {
		packageJson = deepMerge(packageJson, await fetchTemplateJson('typescript-eslint', 'package-githooks.json'));
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
