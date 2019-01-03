import path from 'path';
import program from 'commander';
import fs from 'fs-extra';

import { getPwd } from './get-pwd';
import { getCwd } from './get-cwd';
import { fetchInquirer } from './fetch-inquirer';

// define cli api by using commander
export interface IOptions {
	cwd: string;

	// details
	ts: boolean;
	tslint: boolean;
	es: boolean;
	eslint: boolean;
	editorconfig: boolean;
	prettier: boolean;
	stylelint: boolean;
	license?: string;
	gitignore: boolean;
	npmrc: boolean;
	readme: boolean;
	githooks: boolean;
	commitlint: boolean;
	nodenv: boolean;
	webpack: boolean;

	install: boolean;
	force: boolean;
}

export interface IProgram {
	cwd?: string;

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
	license?: string;
	gitignore?: boolean;
	npmrc?: boolean;
	readme?: boolean;
	githooks?: boolean;
	commitlint?: boolean;
	nodenv?: boolean;
	webpack?: boolean;

	install?: boolean;
	noInstall?: boolean;
	force?: boolean;

	rawArgs: string[];
}

const pwd = getPwd();
const cwd = getCwd();

export const hasOptions = (options: any) => Object.values(options).some((val) => val !== undefined);

const transformAnswersToOptions = (answers: IProgram): IOptions => {
	if (answers.presetTs) {
		return {
			cwd: answers.cwd || cwd,
			ts: true,
			tslint: true,
			es: false,
			eslint: false,
			editorconfig: true,
			prettier: true,
			stylelint: true,
			license: answers.license,
			gitignore: true,
			npmrc: true,
			readme: true,
			githooks: true,
			commitlint: true,
			nodenv: true,
			webpack: true,
			install: answers.noInstall ? false : answers.install || true,
			force: answers.force || false,
		};
	}

	if (answers.presetEs) {
		return {
			cwd: answers.cwd || cwd,
			ts: false,
			tslint: false,
			es: true,
			eslint: true,
			editorconfig: true,
			prettier: true,
			stylelint: true,
			license: answers.license,
			gitignore: true,
			npmrc: true,
			readme: true,
			githooks: true,
			commitlint: true,
			nodenv: true,
			webpack: true,
			install: answers.noInstall ? false : answers.install || true,
			force: answers.force || false,
		};
	}

	return {
		cwd: answers.cwd || cwd,
		ts: answers.ts || false,
		tslint: answers.tslint || false,
		es: answers.es || false,
		eslint: answers.eslint || false,
		editorconfig: answers.editorconfig || false,
		prettier: answers.prettier || false,
		stylelint: answers.stylelint || false,
		license: answers.license,
		gitignore: answers.gitignore || false,
		npmrc: answers.npmrc || false,
		readme: answers.readme || false,
		githooks: answers.commitlint || answers.githooks || false,
		commitlint: answers.commitlint || false,
		nodenv: answers.nodenv || false,
		webpack: answers.webpack || false,
		install: answers.noInstall ? false : answers.install || false,
		force: answers.force || false,
	};
};

export const fetchOptions = async (): Promise<IOptions> => {
	const packageData = JSON.parse(await fs.readFile(path.join(pwd, 'package.json'), 'utf8'));

	const pg = (program
		.version(packageData.version || '')
		.option('-pTs, --presetTs', 'Preset typescript (recommended)')
		.option('-pEs, --presetEs', 'Preset javascript')
		.option('-ts, --ts', 'with typescript configurations')
		.option('-tsl, --tslint', 'add tslint')
		.option('-es, --es', 'with javascript configurations')
		.option('-esl, --eslint', 'add eslint')
		.option('-e --editorconfig', 'add editorconfig')
		.option('-p --prettier', 'add prettier')
		.option('-s --stylelint', 'add stylelint')
		.option('-l --license [string]', 'add license file with given company name')
		.option('-gi --gitignore', 'add gitignore')
		.option('-n --npmrc', 'add npmrc')
		.option('-r --readme', 'add readme file')
		.option('-gh --githooks', 'add githooks')
		.option('-c --commitlint', 'add commitlint (will enable githooks too)')
		.option('-nv --nodenv', 'add nodenv node-version file')
		.option('-w --webpack', 'add webpack with webpack-config-plugins')
		.option('-i --install', 'install dependencies')
		.option('-ni --noInstall', "don't install dependencies")
		.option('-f --force', 'create package.json and override existing files')
		.option('-cwd --cwd', 'defines where the configurations will be installed (default = process.cwd())')
		.parse(process.argv) as any) as IProgram;

	if (pg.rawArgs.length <= 2) {
		return await fetchInquirer();
	}

	return transformAnswersToOptions(pg);
};
