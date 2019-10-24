import { fetchTemplate } from './fetch-template';
import { IOptions } from './const';

const createNpmRcFile = async ({ npmrc }: IOptions): Promise<{ '.npmrc'?: string }> => {
	if (!npmrc) {
		return {};
	}

	return {
		'.npmrc': await fetchTemplate('npmrc', '.npmrc'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createNpmRcFile(options)),
});
