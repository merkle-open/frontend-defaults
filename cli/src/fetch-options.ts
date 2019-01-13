import program from 'commander';

import { getCwd } from './get-cwd';
import { fetchSurvey, TLicense, TYPE_CHOICES } from './fetch-survey';
import { IPackageJson } from './type-package-json';

export type TMode = 'cli' | 'api' | 'survey';

// define cli api by using commander
export interface IOptions {
	cwd: string;
	packageJson?: IPackageJson;
	license?: TLicense;
	copyrightHolder?: string;

	// details
	ts: boolean;
	tslint: boolean;
	es: boolean;
	eslint: boolean;
	editorconfig: boolean;
	prettier: boolean;
	stylelint: boolean;
	gitignore: boolean;
	npmrc: boolean;
	readme: boolean;
	githooks: boolean;
	commitlint: boolean;
	nodeVersion: boolean;
	webpack: boolean;

	install: boolean;
	force: boolean;
	dryRun: boolean;

	mode?: TMode;
}

export interface IProgram {
	cwd?: string;
	licenseOpenSource?: boolean;
	licenseClosedSource?: boolean;
	copyrightHolder?: string;

	// presets
	presetTs?: boolean;
	presetEs?: boolean;

	// details
	ts?: boolean;
	tslint?: boolean;
	es?: boolean;
	eslint?: boolean;
	editorconfig?: boolean;
	prettier?: boolean;
	stylelint?: boolean;
	gitignore?: boolean;
	npmrc?: boolean;
	readme?: boolean;
	githooks?: boolean;
	commitlint?: boolean;
	nodeVersion?: boolean;
	webpack?: boolean;

	install?: boolean;
	noInstall?: boolean;
	force?: boolean;
	dryRun?: boolean;

	rawArgs: string[];
}

const cwd = getCwd();

export const hasOptions = (options: any) => Object.values(options).some((val) => val !== undefined);

const transformAnswersToOptions = (answers: IProgram): IOptions => {
	const options = {
		cwd: answers.cwd || cwd,
		license: answers.licenseOpenSource
			? TYPE_CHOICES.licenseOpenSource
			: answers.licenseClosedSource
			? TYPE_CHOICES.licenseClosedSource
			: undefined,
		copyrightHolder: answers.copyrightHolder,
		install: answers.noInstall ? false : answers.install || true,
		force: answers.force || false,
		dryRun: answers.dryRun || false,
		mode: 'cli' as 'cli',
	};

	if (answers.presetTs) {
		return {
			...options,
			ts: true,
			tslint: true,
			es: false,
			eslint: false,
			editorconfig: true,
			prettier: true,
			stylelint: true,
			gitignore: true,
			npmrc: true,
			readme: true,
			githooks: true,
			commitlint: true,
			nodeVersion: true,
			webpack: true,
		};
	}

	if (answers.presetEs) {
		return {
			...options,
			ts: false,
			tslint: false,
			es: true,
			eslint: true,
			editorconfig: true,
			prettier: true,
			stylelint: true,
			gitignore: true,
			npmrc: true,
			readme: true,
			githooks: true,
			commitlint: true,
			nodeVersion: true,
			webpack: true,
		};
	}

	return {
		...options,
		ts: answers.ts || false,
		tslint: answers.tslint || false,
		es: answers.es || false,
		eslint: answers.eslint || false,
		editorconfig: answers.editorconfig || false,
		prettier: answers.prettier || false,
		stylelint: answers.stylelint || false,
		gitignore: answers.gitignore || false,
		npmrc: answers.npmrc || false,
		readme: answers.readme || false,
		githooks: answers.githooks || false,
		commitlint: answers.commitlint || false,
		nodeVersion: answers.nodeVersion || false,
		webpack: answers.webpack || false,
	};
};

export const fetchOptions = async (): Promise<IOptions> => {
	const packageData = require('../package.json');

	const pg = (program
		.version(packageData.version)
		.option('-pTs, --presetTs', 'Preset typescript (recommended)')
		.option('-pEs, --presetEs', 'Preset javascript')
		.option('-ts, --ts', 'with typescript configurations')
		.option('-tsl, --tslint', 'add tslint')
		.option('-es, --es', 'with javascript configurations')
		.option('-esl, --eslint', 'add eslint')
		.option('-e --editorconfig', 'add editorconfig')
		.option('-p --prettier', 'add prettier')
		.option('-s --stylelint', 'add stylelint')
		.option('-lo --licenseOpenSource', 'select open source license')
		.option('-lc --licenseClosedSource', 'select closed source license')
		.option('-ch --copyrightHolder [string]', 'for open source license the copyrightHolder is needed')
		.option('-gi --gitignore', 'add gitignore')
		.option('-n --npmrc', 'add npmrc')
		.option('-r --readme', 'add readme file')
		.option('-gh --githooks', 'add githooks')
		.option('-c --commitlint', 'add commitlint (will enable githooks too)')
		.option('-nv --nodeVersion', 'add node-version file')
		.option('-w --webpack', 'add webpack with webpack-config-plugins')
		.option('-i --install', 'install dependencies')
		.option('-ni --noInstall', "don't install dependencies")
		.option('-f --force', 'create package.json and override existing files')
		.option('-cwd --cwd', 'defines where the configurations will be installed (default = process.cwd())')
		.option('-d --dryRun', 'prints changes will happens by given args')
		.parse(process.argv) as any) as IProgram;

	if (pg.rawArgs.length <= 2) {
		return await fetchSurvey();
	}

	return transformAnswersToOptions(pg);
};
