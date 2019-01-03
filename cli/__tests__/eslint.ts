import { defaultIt } from './shared';

describe('eslint', async () => {
	it('default', async () => await defaultIt('eslint', '--eslint --force --noInstall'));
	it('with-prettier', async () => await defaultIt('eslint-with-prettier', '--eslint --prettier --force --noInstall'));
	it('with-githooks', async () => await defaultIt('eslint-with-githooks', '--eslint --githooks --force --noInstall'));
});
