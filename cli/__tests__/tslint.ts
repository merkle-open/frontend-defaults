import { defaultIt } from './shared';

describe('tslint', async () => {
	it('default', async () => await defaultIt('tmp-tslint', '--tslint --force --noInstall'));
	it('with-prettier', async () =>
		await defaultIt('tmp-tslint-with-prettier', '--tslint --prettier --force --noInstall'));
	it('with-githooks', async () =>
		await defaultIt('tmp-tslint-with-githooks', '--tslint --githooks --force --noInstall'));
});
