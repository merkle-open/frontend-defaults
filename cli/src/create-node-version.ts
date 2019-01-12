import latestVersion from 'latest-version';

import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createNodeVersionFile = async ({ nodeVersion }: IOptions): Promise<{ '.node-version'?: string }> => {
	if (!nodeVersion) {
		return {};
	}

	return {
		'.node-version': `${await latestVersion('node', { version: 'lts' })}`,
	};
};

const updatePackageJson = async ({ nodeVersion }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!nodeVersion) {
		return {};
	}

	const nodeV = await latestVersion('node', { version: 'lts' });

	return {
		'package.json': {
			engines: {
				node: `>=${nodeV.trim().split('.')[0]}`,
			},
		},
	};
};

export const create = async (options: IOptions) => ({
	...(await createNodeVersionFile(options)),
	...(await updatePackageJson(options)),
});
