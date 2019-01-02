import path from 'path';
import fs from 'fs-extra';
import { getCwd } from './get-cwd';

const cwd = getCwd();

export const fetchPackage = async <P>(): Promise<
	{
		scripts?: { [key: string]: string };
		dependencies?: { [key: string]: string };
		devDependencies?: { [key: string]: string };
	} & P
> => {
	let packageData;
	try {
		packageData = JSON.parse(await fs.readFile(path.join(cwd, 'package.json'), 'utf8'));
	} catch (err) {
		packageData = {};
	}
	return packageData;
};
