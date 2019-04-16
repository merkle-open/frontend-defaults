import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createEslintFile = async ({ typescriptEslint, prettier }: IOptions): Promise<{ '.eslintrc.js'?: string }> => {
	if (!typescriptEslint) {
		return {};
	}

	if (prettier) {
		return {
			'.eslintrc.js': await fetchTemplate('typescript-eslint', '.eslintrc-prettier.js'),
		};
	}

	return {
		'.eslintrc.js': await fetchTemplate('typescript-eslint', '.eslintrc.js'),
	};
};

const createEslintignoreFile = async ({ typescriptEslint }: IOptions): Promise<{ '.eslintignore'?: string }> => {
	if (!typescriptEslint) {
		return {};
	}

	return {
		'.eslintignore': await fetchTemplate('typescript-eslint', '.eslintignore'),
	};
};

const updatePackageJson = async ({
	githooks,
	typescriptEslint,
}: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!typescriptEslint) {
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
