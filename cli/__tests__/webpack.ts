import { defaultIt } from './shared';

describe('webpack', async () => {
	it('default', async () => await defaultIt('webpack', '--webpack --force --noInstall'));
});
