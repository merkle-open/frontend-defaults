import fs from 'fs-extra';

export const existDir = async (pathName: string) => {
	try {
		return Boolean((await fs.stat(pathName)).isDirectory);
	} catch (err) {
		return false;
	}
};
