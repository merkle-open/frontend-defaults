import { fetchTemplate } from './fetch-template';
import { IOptions } from './const';

const createEditorconfig = async ({ editorconfig }: IOptions): Promise<{ '.editorconfig'?: string }> => {
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
