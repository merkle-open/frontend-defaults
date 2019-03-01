import deepMerge from 'deepmerge';

import { IPackageJson } from './type-package-json';
import { sortPackageJson } from './sort-package-json';

export interface IFiles {
	[key: string]: any;
}
export interface IJson {
	[key: string]: any;
}

export interface IMergedFiles {
	[key: string]: {
		override: boolean;
		data: string | IJson | IPackageJson;
	};
}

const uniqueArray = (arr: Array<string | number>) => arr.sort().filter((value, index) => value !== arr[index - 1]);
const findArrayInObject = (obj: object, cb: (arr: Array<string | number>) => Array<string | number>) => {
	Object.keys(obj).forEach((key) => {
		if (Array.isArray(obj[key])) {
			obj[key] = cb(obj[key]);
			return;
		}

		if (typeof obj[key] === 'object') {
			findArrayInObject(obj[key], cb);
			return;
		}
	});
};
const removeDuplicateArrayEntiesInObject = (obj: object) => {
	findArrayInObject(obj, (arr: Array<string | number>) => {
		return uniqueArray(arr);
	});
	return obj;
};

const areFilesEqual = (fileA: string | object, fileB: string | object) => {
	let fileAClean = fileA;
	let fileBClean = fileB;

	if (typeof fileA === 'object') {
		fileAClean = JSON.stringify({ ...fileA }, null, 2).trim();
	}
	if (typeof fileB === 'object') {
		fileBClean = JSON.stringify({ ...fileB }, null, 2).trim();
	}
	return Boolean(fileAClean === fileBClean);
};

export const mergeFiles = (originalFiles: IFiles, changes: IFiles): IMergedFiles => {
	let mergedFiles = {};

	Object.keys(changes).forEach((fileName: string) => {
		let override = Boolean(originalFiles[fileName]);
		let data = changes[fileName];

		sortPackageJson(data);

		if (areFilesEqual(originalFiles[fileName], changes[fileName])) {
			return;
		}

		if (fileName === 'package.json') {
			override = false;
			data = removeDuplicateArrayEntiesInObject(deepMerge(originalFiles[fileName] || {}, changes[fileName]));
		}

		mergedFiles[fileName] = {
			override,
			data,
		};
	});

	return mergedFiles;
};
