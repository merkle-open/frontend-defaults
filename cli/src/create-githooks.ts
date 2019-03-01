import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createHuskyrcFile = async ({ githooks }: IOptions): Promise<{ '.huskyrc'?: string }> => {
	if (!githooks) {
		return {};
	}

	return {
		'.huskyrc': await fetchTemplate('githooks', '.huskyrc'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createHuskyrcFile(options)),
});
