import { IPackageJson } from './type-package-json';

export const TYPE_CHOICES = {
	ts: 'typescript' as 'typescript',
	es: 'javascript' as 'javascript',
	eslint: 'eslint' as 'eslint',

	readme: 'readme' as 'readme',
	licenseOpenSource: 'licenseOpenSource' as 'licenseOpenSource',
	licenseClosedSource: 'licenseClosedSource' as 'licenseClosedSource',
	editorconfig: 'editorconfig' as 'editorconfig',
	npmrc: 'npmrc' as 'npmrc',
	nodeVersion: 'nodeVersion' as 'nodeVersion',
	gitignore: 'gitignore' as 'gitignore',
	githooks: 'githooks' as 'githooks',

	prettier: 'prettier' as 'prettier',
	stylelint: 'stylelint' as 'stylelint',
	commitlint: 'commitlint' as 'commitlint',

	webpack: 'webpack' as 'webpack',
	install: 'install' as 'install',
	force: 'force' as 'force',
};

export type TLanguage = typeof TYPE_CHOICES.ts | typeof TYPE_CHOICES.es;
export type TLicense = typeof TYPE_CHOICES.licenseOpenSource | typeof TYPE_CHOICES.licenseClosedSource | undefined;

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
