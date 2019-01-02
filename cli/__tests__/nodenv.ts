import { defaultIt } from './shared';

describe('nodenv', async () => {
	it('default', async () => await defaultIt('tmp-nodenv', '--nodenv --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('tmp-nodenv-with-githooks', '--nodenv --githooks --force --noInstall'));
});
