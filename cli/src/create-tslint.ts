import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createTslintFile = async ({ prettier, tslint }: IOptions): Promise<{ 'tslint.json'?: string }> => {
	if (!tslint) {
		return {};
	}

	if (prettier) {
		return {
			'tslint.json': await fetchTemplate('tslint', 'tslint-prettier.json'),
		};
	}

	return {
		'tslint.json': await fetchTemplate('tslint', 'tslint.json'),
	};
};

const updatePackageJson = async ({
	prettier,
	githooks,
	tslint,
}: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!tslint) {
		return {};
	}

	let packageData = await fetchTemplateJson('tslint', 'package.json');

	if (prettier) {
		packageData = deepMerge(packageData, await fetchTemplateJson('tslint', 'package-prettier.json'));
	}

	if (githooks) {
		packageData = deepMerge(packageData, await fetchTemplateJson('tslint', 'package-githooks.json'));
	}

	return {
		'package.json': packageData,
	};
};
export const create = async (options: IOptions) => ({
	...(await createTslintFile(options)),
	...(await updatePackageJson(options)),
});
