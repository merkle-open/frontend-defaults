import path from 'path';
import fs from 'fs-extra';
import { IPackageJson } from './type-package-json';

export const fetchTemplate = async (dirName: string, fileName: string) => {
	return await fs.readFile(path.join(__dirname, '..', 'templates', dirName, fileName), 'utf8');
};

export const fetchTemplateJson = async (dirName: string, fileName: string): Promise<IPackageJson> => {
	return JSON.parse(await fetchTemplate(dirName, fileName));
};
