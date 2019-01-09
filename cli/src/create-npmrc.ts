import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createNpmRcFile = async ({ npmrc }: IOptions): Promise<{ [key: string]: any }> => {
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
