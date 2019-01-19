import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createGitignoreFile = async ({ gitignore }: IOptions): Promise<{ '.gitignore'?: string }> => {
	if (!gitignore) {
		return {};
	}

	return {
		'.gitignore': await fetchTemplate('gitignore', 'gitignore'),
	};
};

const createGitattributesFile = async ({ gitignore }: IOptions): Promise<{ '.gitattributes'?: string }> => {
	if (!gitignore) {
		return {};
	}

	return {
		'.gitattributes': await fetchTemplate('gitignore', 'gitattributes'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createGitignoreFile(options)),
	...(await createGitattributesFile(options)),
});
