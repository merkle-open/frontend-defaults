import path from 'path';
import deepMerge from 'deepmerge';

import { IOptions } from './fetch-options';
import { fetchTemplate, fetchTemplateJson } from './fetch-template';
import { IPackageJson } from './type-package-json';

const createDemoFiles = async ({ ts, build }: IOptions): Promise<{ 'src/index.ts'?: string }> => {
	if (!build) {
		return {};
	}

	if (ts) {
		return {
			[path.join('src', 'index.ts')]: await fetchTemplate('build', 'index.ts'),
		};
	}

	return {
		[path.join('src', 'index.js')]: await fetchTemplate('build', 'index.js'),
	};
};

const createBabelConfigFile = async ({ build, ts }: IOptions): Promise<{ 'babel.config.js'?: string }> => {
	if (!build || ts) {
		return {};
	}

	return {
		'babel.config.js': await fetchTemplate('build', 'babel.config.js'),
	};
};

const updatePackageJson = async ({ build, ts }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!build) {
		return {};
	}

	let packageData = await fetchTemplateJson('build', 'package.json');

	if (ts) {
		return {
			'package.json': deepMerge(packageData, await fetchTemplateJson('build', 'package-ts.json')),
		};
	}

	return { 'package.json': deepMerge(packageData, await fetchTemplateJson('build', 'package-babel.json')) };
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
