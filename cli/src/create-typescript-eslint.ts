import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const createEslintFile = async ({
	eslint,
	ts,
	prettier,
}: IOptions): Promise<{ '.eslintrc.js'?: string; '.eslintrc.strict.js'?: string }> => {
	if (!ts || !eslint) {
		return {};
	}

	if (prettier) {
		const template = await fetchTemplate('typescript-eslint', '.eslintrc-prettier.js');
		const templateStrict = await fetchTemplate('typescript-eslint', '.eslintrc-prettier.strict.js');
		return {
			'.eslintrc.js': template,
			'.eslintrc.strict.js': templateStrict,
		};
	}

	const template = await fetchTemplate('typescript-eslint', '.eslintrc.js');
	const templateStrict = await fetchTemplate('typescript-eslint', '.eslintrc.strict.js');
	return {
		'.eslintrc.js': template,
		'.eslintrc.strict.js': templateStrict,
	};
};

const createEslintignoreFile = async ({ ts, eslint }: IOptions): Promise<{ '.eslintignore'?: string }> => {
	if (!ts || !eslint) {
		return {};
	}

	const template = await fetchTemplate('typescript-eslint', '.eslintignore');
	return {
		'.eslintignore': template,
	};
};

const updatePackageJson = async ({ githooks, ts, eslint }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!ts || !eslint) {
		return {};
	}

	let packageJson = await fetchTemplateJson('typescript-eslint', 'package.json');

	if (githooks) {
		const templateGithooks = await fetchTemplateJson('typescript-eslint', 'package-githooks.json');
		packageJson = deepMerge(packageJson, templateGithooks);
	}

	return {
		'package.json': packageJson,
	};
};

export const create = async (options: IOptions) => ({
	...(await createEslintFile(options)),
	...(await createEslintignoreFile(options)),
	...(await updatePackageJson(options)),
});
