import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createLicense = async ({ licenseMIT }: IOptions): Promise<{ [key: string]: any }> => {
	if (typeof licenseMIT !== 'string' || licenseMIT === '') {
		return {};
	}

	return {
		LICENSE: (await fetchTemplate('license', 'LICENSE'))
			.replace('COPYRIGHT_YEAR', new Date().getFullYear().toString())
			.replace('COPYRIGHT_HOLDER', licenseMIT),
	};
};

const updatePackageJson = async ({ licenseMIT }: IOptions): Promise<{ [key: string]: any }> => {
	if (typeof licenseMIT !== 'string' || licenseMIT === '') {
		return {};
	}

	return {
		'package.json': {
			licenseMIT: 'MIT',
		},
	};
};
export const create = async (options: IOptions) => ({
	...(await createLicense(options)),
	...(await updatePackageJson(options)),
});
