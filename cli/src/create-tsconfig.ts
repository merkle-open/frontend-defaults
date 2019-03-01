import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';

const createTsconfigFile = async ({ ts }: IOptions): Promise<{ [key: string]: any }> => {
	if (!ts) {
		return {};
	}

	return {
		'tsconfig.json': await fetchTemplate('tsconfig', 'tsconfig.json'),
	};
};

const updatePackageJson = async ({ ts }: IOptions): Promise<{ [key: string]: any }> => {
	if (!ts) {
		return {};
	}

	return {
		'package.json': await fetchTemplateJson('tsconfig', 'package.json'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createTsconfigFile(options)),
	...(await updatePackageJson(options)),
});
