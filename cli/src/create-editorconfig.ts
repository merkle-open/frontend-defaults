import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';

const createEditorconfig = async ({ editorconfig }: IOptions): Promise<{ [key: string]: any }> => {
	if (!editorconfig) {
		return {};
	}

	return {
		'.editorconfig': await fetchTemplate('editorconfig', '.editorconfig'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createEditorconfig(options)),
});
