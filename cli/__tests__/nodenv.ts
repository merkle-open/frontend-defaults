import { defaultIt } from './shared';

describe('nodenv', async () => {
	it('default', async () => await defaultIt('nodenv', '--nodenv --force --noInstall'));
	it('with-githooks', async () => await defaultIt('nodenv-with-githooks', '--nodenv --githooks --force --noInstall'));
});
