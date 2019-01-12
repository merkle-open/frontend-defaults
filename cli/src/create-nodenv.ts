import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createNodeVersionFile = async ({ nodenv }: IOptions): Promise<{ '.node-version'?: string }> => {
	if (!nodenv) {
		return {};
	}

	return {
		'.node-version': await fetchTemplate('node-version', '.node-version'),
	};
};

const createHuskyrcFile = async ({ githooks }: IOptions): Promise<{ '.huskyrc'?: string }> => {
	if (!githooks) {
		return {};
	}

	return {
		'.huskyrc': await fetchTemplate('node-version', '.huskyrc'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createNodeVersionFile(options)),
	...(await createHuskyrcFile(options)),
});
