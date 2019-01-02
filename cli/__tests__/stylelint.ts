import { defaultIt } from './shared';

describe('stylelint', async () => {
	it('default', async () => await defaultIt('tmp-stylelint', '--stylelint --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('tmp-stylelint-with-githooks', '--stylelint --githooks --force --noInstall'));
});
