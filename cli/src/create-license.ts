import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createLicense = async ({ licenseMIT }: IOptions): Promise<{ LICENSE?: string }> => {
	if (typeof licenseMIT !== 'string' || licenseMIT === '') {
		return {};
	}

	return {
		LICENSE: (await fetchTemplate('license', 'LICENSE'))
			.replace('COPYRIGHT_YEAR', new Date().getFullYear().toString())
			.replace('COPYRIGHT_HOLDER', licenseMIT),
	};
};

const updatePackageJson = async ({ licenseMIT }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (typeof licenseMIT !== 'string' || licenseMIT === '') {
		return {};
	}

	return {
		'package.json': {
			license: 'MIT',
		},
	};
};
export const create = async (options: IOptions) => ({
	...(await createLicense(options)),
	...(await updatePackageJson(options)),
});
