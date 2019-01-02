import path from 'path';
import program from 'commander';
import fs from 'fs-extra';

import { getPwd } from './get-pwd';
import { fetchInquirer } from './fetch-inquirer';

// define cli api by using commander
export interface IOptions {
	// details
	ts: boolean;
	tslint: boolean;
	es: boolean;
	eslint: boolean;
	editorconfig: boolean;
	prettier: boolean;
	stylelint: boolean;
	license: boolean;
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
	license?: boolean;
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

export const hasOptions = (options) => Object.values(options).some((val) => val !== undefined);

const transformAnswersToOptions = (answers: IProgram): IOptions => {
	if (answers.presetTs) {
		return {
			ts: true,
			tslint: true,
			es: false,
			eslint: false,
			editorconfig: true,
			prettier: true,
			stylelint: true,
			license: true,
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
			ts: false,
			tslint: false,
			es: true,
			eslint: true,
			editorconfig: true,
			prettier: true,
			stylelint: true,
			license: true,
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
		ts: answers.ts || false,
		tslint: answers.tslint || false,
		es: answers.es || false,
		eslint: answers.eslint || false,
		editorconfig: answers.editorconfig || false,
		prettier: answers.prettier || false,
		stylelint: answers.stylelint || false,
		license: answers.license || false,
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
		// TODO add
		// .option('-l --license', 'add license file')
		.option('-gi --gitignore', 'add gitignore')
		.option('-n --npmrc', 'add npmrc')
		// TODO add
		// .option('-r --readme', 'add readme file')
		.option('-gh --githooks', 'add githooks')
		.option('-c --commitlint', 'add commitlint (will enable githooks too)')
		.option('-nv --nodenv', 'add nodenv node-version file')
		.option('-w --webpack', 'add webpack with webpack-config-plugins')
		.option('-i --install', 'install dependencies')
		.option('-ni --noInstall', "don't install dependencies")
		.option('-f --force', 'create package.json and override existing files')
		.parse(process.argv) as any) as IProgram;

	if (pg.rawArgs.length <= 2) {
		return await fetchInquirer();
	}

	return transformAnswersToOptions(pg);
};
