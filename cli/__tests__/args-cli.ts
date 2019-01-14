import 'jest';
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
	tslint: false,
	webpack: false,
};

describe('presetTs', async () => {
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
			tslint: true,
			webpack: true,
		});
	});
});

describe('commitlint', async () => {
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

describe('editorconfig', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--editorconfig'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, editorconfig: true, install: true });
	});
});

describe('eslint', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--eslint'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, eslint: true, install: true });
	});
});

describe('gitignore', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--gitignore'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, gitignore: true, install: true });
	});
});

describe('license', async () => {
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

describe('node-version', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--nodeVersion'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, nodeVersion: true, install: true });
	});
});

describe('npmrc', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--npmrc'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, npmrc: true, install: true });
	});
});

describe('prettier', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--prettier'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, prettier: true, install: true });
	});
});

describe('readme', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--readme'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, readme: true, install: true });
	});
});

describe('stylelint', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--stylelint'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, stylelint: true, install: true });
	});
});

describe('tsconfig', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--ts'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, ts: true, install: true });
	});
});

describe('tslint', async () => {
	it('default', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/frontend-defaults', '--tslint'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({ ...defaultOptions, tslint: true, install: true });
	});
});

describe('webpack', async () => {
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
