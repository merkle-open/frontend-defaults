import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const createPrettieringoreFile = async ({ prettier }: IOptions): Promise<{ '.prettierignore'?: string }> => {
	if (!prettier) {
		return {};
	}

	const template = await fetchTemplate('prettier', '.prettierignore');
	return {
		'.prettierignore': template,
	};
};

const createPrittierrcFile = async ({ prettier }: IOptions): Promise<{ '.prettierrc.js'?: string }> => {
	if (!prettier) {
		return {};
	}

	const template = await fetchTemplate('prettier', '.prettierrc.js');
	return {
		'.prettierrc.js': template,
	};
};

const updatePackageJson = async ({ prettier, githooks }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!prettier) {
		return {};
	}

	if (githooks) {
		const template = await fetchTemplateJson('prettier', 'package-githooks.json');
		return {
			'package.json': template,
		};
	}

	const template = await fetchTemplateJson('prettier', 'package.json');
	return {
		'package.json': template,
	};
};

export const create = async (options: IOptions) => ({
	...(await createPrettieringoreFile(options)),
	...(await createPrittierrcFile(options)),
	...(await updatePackageJson(options)),
});
