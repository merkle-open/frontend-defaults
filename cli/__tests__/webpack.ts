import { defaultIt } from './shared';

describe('webpack', async () => {
	it('default', async () => await defaultIt('webpack', '--webpack --force --noInstall'));
});

describe('webpack-with-ts', async () => {
	it('default', async () => await defaultIt('webpack-with-ts', '--webpack --ts --force --noInstall'));
});
