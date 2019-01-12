import path from 'path';

import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createReadme = async ({ cwd, readme }: IOptions): Promise<{ 'README.md'?: string }> => {
	if (!readme) {
		return {};
	}

	return {
		'README.md': (await fetchTemplate('readme', 'README.md')).replace('PROJECT_NAME', path.basename(cwd)),
	};
};

export const create = async (options: IOptions) => ({
	...(await createReadme(options)),
});
