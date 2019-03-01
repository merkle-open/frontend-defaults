import { fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const updatePackageJson = async ({ commitlint }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!commitlint) {
		return {};
	}

	return {
		'package.json': await fetchTemplateJson('commitlint', 'package.json'),
	};
};

export const create = async (options: IOptions) => ({
	...(await updatePackageJson(options)),
});
