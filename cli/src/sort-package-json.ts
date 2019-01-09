import stringify from 'json-stable-stringify';
import { IPackageJson } from './type-package-json';

export const sortPackageJson = (packageJson: IPackageJson) => {
	if (packageJson.dependencies) {
		packageJson.dependencies = JSON.parse(stringify(packageJson.dependencies, { space: '  ' }));
	}
	if (packageJson.devDependencies) {
		packageJson.devDependencies = JSON.parse(stringify(packageJson.devDependencies, { space: '  ' }));
	}
	if (packageJson.scripts) {
		packageJson.scripts = JSON.parse(stringify(packageJson.scripts, { space: '  ' }));
	}
};
