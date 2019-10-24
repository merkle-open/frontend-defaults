import path from 'path';
import deepMerge from 'deepmerge';

import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { IOptions } from './const';

const createDemoFiles = async ({ ts, build }: IOptions): Promise<{ 'src/index.ts'?: string }> => {
	if (!build) {
		return {};
	}

	if (ts) {
		const template = await fetchTemplate('build', 'index.ts');
		return {
			[path.join('src', 'index.ts')]: template,
		};
	}

	const template = await fetchTemplate('build', 'index.js');
	return {
		[path.join('src', 'index.js')]: template,
	};
};

const createBabelConfigFile = async ({ build, ts }: IOptions): Promise<{ 'babel.config.js'?: string }> => {
	if (!build || ts) {
		return {};
	}

	const template = await fetchTemplate('build', 'babel.config.js');
	return {
		'babel.config.js': template,
	};
};

const updatePackageJson = async ({ build, ts }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!build) {
		return {};
	}

	let packageData = await fetchTemplateJson('build', 'package.json');

	if (ts) {
		const template = await fetchTemplateJson('build', 'package-ts.json');
		return {
			'package.json': deepMerge(packageData, template),
		};
	}

	const template = await fetchTemplateJson('build', 'package-babel.json');
	return { 'package.json': deepMerge(packageData, template) };
};

export const create = async (options: IOptions) => {
	if (!options.build) {
		return {};
	}

	return {
		...(await createBabelConfigFile(options)),
		...(await createDemoFiles(options)),
		...(await updatePackageJson(options)),
	};
};
