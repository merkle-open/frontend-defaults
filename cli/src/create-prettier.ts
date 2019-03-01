import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createPrettieringoreFile = async ({ prettier }: IOptions): Promise<{ '.prettierignore'?: string }> => {
	if (!prettier) {
		return {};
	}

	return {
		'.prettierignore': await fetchTemplate('prettier', '.prettierignore'),
	};
};

const createPrittierrcFile = async ({ prettier }: IOptions): Promise<{ '.prettierrc.js'?: string }> => {
	if (!prettier) {
		return {};
	}

	return {
		'.prettierrc.js': await fetchTemplate('prettier', '.prettierrc.js'),
	};
};

const updatePackageJson = async ({ prettier, githooks }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!prettier) {
		return {};
	}

	if (githooks) {
		return {
			'package.json': await fetchTemplateJson('prettier', 'package-githooks.json'),
		};
	}

	return {
		'package.json': await fetchTemplateJson('prettier', 'package.json'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createPrettieringoreFile(options)),
	...(await createPrittierrcFile(options)),
	...(await updatePackageJson(options)),
});
