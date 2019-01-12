import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IOptions } from './fetch-options';
import { IPackageJson } from './type-package-json';

const createStylelintConfigFile = async ({ stylelint }: IOptions): Promise<{ 'stylelint.config.js'?: string }> => {
	if (!stylelint) {
		return {};
	}

	return {
		'stylelint.config.js': await fetchTemplate('stylelint', 'stylelint.config.js'),
	};
};

const createStylelintIgnoreFile = async ({ stylelint }: IOptions): Promise<{ '.stylelintignore'?: string }> => {
	if (!stylelint) {
		return {};
	}

	return {
		'.stylelintignore': await fetchTemplate('stylelint', '.stylelintignore'),
	};
};

const updatePackageJson = async ({ cwd, stylelint, githooks }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!stylelint) {
		return {};
	}

	if (githooks) {
		return {
			'package.json': await fetchTemplateJson('stylelint', 'package-githooks.json'),
		};
	}

	return {
		'package.json': await fetchTemplateJson('stylelint', 'package.json'),
	};
};

export const create = async (options: IOptions) => ({
	...(await createStylelintConfigFile(options)),
	...(await createStylelintIgnoreFile(options)),
	...(await updatePackageJson(options)),
});
