import path from 'path';
import { Command } from 'commander';

import { getCwd } from './get-cwd';
import { fetchSurvey, TLicense, TYPE_CHOICES } from './fetch-survey';
import { IPackageJson } from './type-package-json';

export const presets = {
	ts: 'ts' as 'ts',
	es: 'es' as 'es',
};

export type TPreset = keyof typeof presets;

export type TMode = 'cli' | 'api' | 'survey';

// define cli api by using commander
export interface IOptions {
	cwd: string;
	packageJson?: IPackageJson;
	license?: TLicense;
	copyrightHolder?: string;

	// details
	ts: boolean;
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
	build: boolean;

	install: boolean;
	force: boolean;
	dryRun: boolean;

	mode?: TMode;
	preset?: TPreset;
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
	build?: boolean;

	install?: boolean;
	noInstall?: boolean;
	force?: boolean;
	dryRun?: boolean;

	rawArgs: string[];
	args: string[];
}

const cwd = getCwd();

export const hasOptions = (options: any) => Object.values(options).some((val) => val !== undefined);

const transformAnswersToOptions = (answers: IProgram): IOptions => {
	const options = {
		cwd: Array.isArray(answers.args) && answers.args[0] ? path.join(cwd, answers.args[0]) : cwd,
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
		build: answers.build || false,
	};

	if (answers.presetTs) {
		return {
			...options,
			ts: true,
			es: false,
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
			preset: presets.ts,
		};
	}

	if (answers.presetEs) {
		return {
			...options,
			ts: false,
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
			preset: presets.es,
		};
	}

	return {
		...options,
		ts: answers.ts || false,
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

	const pg = (new Command()
		.version(packageData.version)
		.command('<project-name>')
		.option('-pTs, --presetTs', 'Preset typescript (recommended)')
		.option('-pEs, --presetEs', 'Preset javascript')
		.option('-ts, --ts', 'with typescript configurations')
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
		.option('-b --build', 'add build and watch script')
		.option('-i --install', 'install dependencies')
		.option('-ni --noInstall', "don't install dependencies")
		.option('-f --force', 'create package.json and override existing files')
		.option('-cwd --cwd', 'defines where the configurations will be installed (default = process.cwd())')
		.option('-d --dryRun', 'prints changes will happens by given args')
		.parse(process.argv) as any) as IProgram;

	let newCwd = pg.args.length === 1 ? path.join(cwd, pg.args[0]) : path.join(cwd);

	if (pg.args.length === 1 && pg.rawArgs.length <= 3) {
		return await fetchSurvey(newCwd);
	}

	if (pg.rawArgs.length <= 2) {
		return await fetchSurvey(newCwd);
	}

	return transformAnswersToOptions(pg);
};
