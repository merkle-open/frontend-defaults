import { fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const updatePackageJson = async ({ licenseChecker }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!licenseChecker) {
		return {};
	}

	const template = await fetchTemplateJson('license-checker', 'package.json');
	return {
		'package.json': template,
	};
};

export const create = async (options: IOptions) => ({
	...(await updatePackageJson(options)),
});
