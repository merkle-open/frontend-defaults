import { defaultIt } from './shared';

describe('prettier', async () => {
	it('default', async () => await defaultIt('prettier', '--prettier --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('prettier-with-githooks', '--prettier --githooks --force --noInstall'));
});
