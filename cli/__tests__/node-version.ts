import { defaultIt } from './shared';

describe('node-version', async () => {
	it('default', async () => await defaultIt('node-version', '--nodeVersion --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('node-version-with-githooks', '--nodeVersion --githooks --force --noInstall'));
});
