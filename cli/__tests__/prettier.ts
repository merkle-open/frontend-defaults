import { defaultIt } from './shared';

describe('prettier', async () => {
	it('default', async () => await defaultIt('tmp-prettier', '--prettier --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('tmp-prettier-with-githooks', '--prettier --githooks --force --noInstall'));
});
