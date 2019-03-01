import latestVersion from 'latest-version';

import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createNodeVersionFiles = async ({
	nodeVersion,
}: IOptions): Promise<{ '.node-version'?: string; '.nvmrc'?: string }> => {
	if (!nodeVersion) {
		return {};
	}

	const nodeVersionNumber = await latestVersion('node', { version: 'lts' });

	return {
		'.node-version': nodeVersionNumber,
		'.nvmrc': nodeVersionNumber,
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
	...(await createNodeVersionFiles(options)),
	...(await updatePackageJson(options)),
});
