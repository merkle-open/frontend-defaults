import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const createStylelintConfigFile = async ({ stylelint }: IOptions): Promise<{ 'stylelint.config.js'?: string }> => {
	if (!stylelint) {
		return {};
	}

	const template = await fetchTemplate('stylelint', 'stylelint.config.js');
	return {
		'stylelint.config.js': template,
	};
};

const createStylelintIgnoreFile = async ({ stylelint }: IOptions): Promise<{ '.stylelintignore'?: string }> => {
	if (!stylelint) {
		return {};
	}

	const template = await fetchTemplate('stylelint', '.stylelintignore');
	return {
		'.stylelintignore': template,
	};
};

const updatePackageJson = async ({ stylelint, githooks }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!stylelint) {
		return {};
	}

	if (githooks) {
		const template = await fetchTemplateJson('stylelint', 'package-githooks.json');
		return {
			'package.json': template,
		};
	}

	const template = await fetchTemplateJson('stylelint', 'package.json');
	return {
		'package.json': template,
	};
};

export const create = async (options: IOptions) => ({
	...(await createStylelintConfigFile(options)),
	...(await createStylelintIgnoreFile(options)),
	...(await updatePackageJson(options)),
});
