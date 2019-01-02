import { defaultIt } from './shared';

describe('webpack', async () => {
	it('default', async () => await defaultIt('tmp-webpack', '--webpack --force --noInstall'));
});
