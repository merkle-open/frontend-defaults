import { fetchTemplate } from './fetch-template';
import { IPackageJson } from './type-package-json';
import { TYPE_CHOICES, IOptions } from './const';
import chalk from 'chalk';

const createLicense = async ({ license, copyrightHolder }: IOptions): Promise<{ LICENSE?: string }> => {
	if (license !== TYPE_CHOICES.licenseOpenSource) {
		return {};
	}

	if (!copyrightHolder) {
		console.warn(chalk.yellow('CopyrightHolder `--copyrightHolder=[string]` needed for open source license MIT'));
		return {};
	}

	return {
		LICENSE: (await fetchTemplate('license', 'LICENSE'))
			.replace('COPYRIGHT_YEAR', new Date().getFullYear().toString())
			.replace('COPYRIGHT_HOLDER', copyrightHolder),
	};
};

const updatePackageJson = async ({ license }: IOptions): Promise<{ 'package.json'?: IPackageJson }> => {
	if (!license) {
		return {};
	}

	if (license === TYPE_CHOICES.licenseClosedSource) {
		return {
			'package.json': {
				license: 'UNLICENSED',
				private: true,
			},
		};
	}

	return {
		'package.json': {
			license: 'MIT',
			private: false,
		},
	};
};
export const create = async (options: IOptions) => ({
	...(await createLicense(options)),
	...(await updatePackageJson(options)),
});
