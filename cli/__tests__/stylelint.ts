import { defaultIt } from './shared';

describe('stylelint', async () => {
	it('default', async () => await defaultIt('stylelint', '--stylelint --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('stylelint-with-githooks', '--stylelint --githooks --force --noInstall'));
});
