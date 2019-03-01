import fs from 'fs-extra';

export const existFile = async (pathName: string) => {
	try {
		return Boolean((await fs.stat(pathName)).isFile);
	} catch (err) {
		return false;
	}
};
