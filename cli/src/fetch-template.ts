import path from 'path';
import fs from 'fs-extra';

export const fetchTemplate = async (dirName: string, fileName: string) => {
	return await fs.readFile(path.join(__dirname, '..', 'templates', dirName, fileName), 'utf8');
};

export const fetchTemplateJson = async (dirName: string, fileName: string) => {
	return JSON.parse(await fetchTemplate(dirName, fileName));
};
