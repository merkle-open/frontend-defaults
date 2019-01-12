import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createEslintFile = async ({ eslint, prettier }: IOptions): Promise<{ '.eslintrc.js'?: string }> => {
	if (!eslint) {
		return {};
	}

	if (prettier) {
		return {
			'.eslintrc.js': await fetchTemplate('eslint', '.eslintrc-prettier.js'),
		};
	}

	return {
		'.eslintrc.js': await fetchTemplate('eslint', '.eslintrc.js'),
	};
};

const createEslintignoreFile = async ({ eslint }: IOptions): Promise<{ '.eslintignore'?: string }> => {
	if (!eslint) {
		return {};
	}

	return {
		'.eslintignore': await fetchTemplate('eslint', '.eslintignore'),
	};
};

const updatePackageJson = async ({ githooks, eslint }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!eslint) {
		return {};
	}

	if (githooks) {
		return {
			'package.json': await fetchTemplateJson('eslint', 'package-githooks.json'),
		};
	}

	return {
		'package.json': await fetchTemplateJson('eslint', 'package.json'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createEslintFile(options)),
	...(await createEslintignoreFile(options)),
	...(await updatePackageJson(options)),
});
