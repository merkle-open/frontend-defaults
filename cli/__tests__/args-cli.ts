/// <reference types="@types/jest" />
import path from 'path';

import { fetchOptions } from '../src/fetch-options';

const defaultOptions = {
	commitlint: false,
	copyrightHolder: undefined,
	dryRun: false,
	editorconfig: false,
	es: false,
	eslint: false,
	force: false,
	githooks: false,
	gitignore: false,
	install: false,
	license: undefined,
	mode: 'cli',
	nodeVersion: false,
	npmrc: false,
	prettier: false,
	readme: false,
	stylelint: false,
	ts: false,
	webpack: false,
	build: false,
};

describe('presetTs', () => {
	it('default', async () => {
		global.process.argv = [
			'/usr/local/bin/node',
			'/usr/local/bin/frontend-defaults',
			'--presetTs',
			'--force',
			'--noInstall',
		];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({
			...defaultOptions,
			commitlint: true,
			editorconfig: true,
			force: true,
			githooks: true,
			gitignore: true,
			nodeVersion: true,
			npmrc: true,
			prettier: true,
			readme: true,
			stylelint: true,
			ts: true,
			eslint: true,
			webpack: true,
			preset: 'ts',
		});
	});
});

describe('presetEs', () => {
	it('default', async () => {
		global.process.argv = [
			'/usr/local/bin/node',
			'/usr/local/bin/frontend-defaults',
			'--presetEs',
			'--force',
			'--noInstall',
		];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({
			...defaultOptions,
			commitlint: true,
			editorconfig: true,
			force: true,
			githooks: true,
			gitignore: true,
			nodeVersion: true,
			npmrc: true,
			prettier: true,
			readme: true,
			stylelint: true,
			es: true,
			eslint: true,
			webpack: true,
			preset: 'es',
		});
	});
});

describe('commitlint', () => {
	it('default', async () => {
		global.process.argv = [
			'/usr/local/bin/node',
			'/usr/local/bin/frontend-defaults',
			'--commitlint',
			'--force',
			'--noInstall',
		];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, commitlint: true, force: true });
	});
});

describe('editorconfig', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--editorconfig'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, editorconfig: true, install: true });
	});
});

describe('eslint', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--eslint'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, eslint: true, install: true });
	});
});

describe('gitignore', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--gitignore'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, gitignore: true, install: true });
	});
});

describe('license', () => {
	it('closedSource', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--licenseClosedSource'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, license: 'licenseClosedSource', install: true });
	});
	it('openSource', async () => {
		global.process.argv = [
			'/usr/local/bin/node',
			'/usr/local/bin/frontend-defaults',
			'--licenseOpenSource',
			'--copyrightHolder=Namics AG',
		];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({
			...defaultOptions,
			license: 'licenseOpenSource',
			copyrightHolder: 'Namics AG',
			install: true,
		});
	});
});

describe('node-version', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--nodeVersion'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, nodeVersion: true, install: true });
	});
});

describe('npmrc', () => {
	it.skip('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--npmrc'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, npmrc: true, install: true });
	});
});

describe('prettier', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--prettier'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, prettier: true, install: true });
	});
});

describe('readme', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--readme'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, readme: true, install: true });
	});
});

describe('stylelint', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--stylelint'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, stylelint: true, install: true });
	});
});

describe('tsconfig', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--ts'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, ts: true, install: true });
	});
});

describe('webpack', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--webpack'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, webpack: true, install: true });
	});
	it('webpack-ts', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--webpack', '--ts'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, webpack: true, ts: true, install: true });
	});
});

describe('build', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--build'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, build: true, install: true });
	});
	it('build-ts', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--build', '--ts'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, build: true, ts: true, install: true });
	});
});

describe('with project name', () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', 'my-project', '--webpack'];
		const options = await fetchOptions();
		expect(path.basename(options.cwd)).toBe('my-project');
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, webpack: true, install: true });
	});
});
