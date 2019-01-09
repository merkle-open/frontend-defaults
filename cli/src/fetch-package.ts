import path from 'path';
import fs from 'fs-extra';
import { IPackageJson } from './type-package-json';

export const fetchPackage = async (cwd: string) => {
	let packageData: IPackageJson;
	try {
		packageData = JSON.parse(await fs.readFile(path.join(cwd, 'package.json'), 'utf8'));
	} catch (err) {
		packageData = {};
	}
	return packageData;
};
