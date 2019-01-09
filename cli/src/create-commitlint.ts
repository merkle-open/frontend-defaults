import { fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';

const updatePackageJson = async ({ commitlint }: IOptions): Promise<{ [key: string]: any }> => {
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
