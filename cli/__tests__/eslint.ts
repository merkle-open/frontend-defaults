import { defaultIt } from './shared';

describe('eslint', async () => {
	it('default', async () => await defaultIt('tmp-eslint', '--eslint --force --noInstall'));
	it('with-prettier', async () =>
		await defaultIt('tmp-eslint-with-prettier', '--eslint --prettier --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('tmp-eslint-with-githooks', '--eslint --githooks --force --noInstall'));
});
