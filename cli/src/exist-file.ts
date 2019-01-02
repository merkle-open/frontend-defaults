import fs from 'fs-extra';

export const existFile = async (pathName: string) => {
	try {
		return (await fs.stat(pathName)).isFile;
	} catch (err) {
		return false;
	}
};
