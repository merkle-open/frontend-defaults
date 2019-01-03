import { defaultIt } from './shared';

describe('tslint', async () => {
	it('default', async () => await defaultIt('tslint', '--tslint --force --noInstall'));
	it('with-prettier', async () => await defaultIt('tslint-with-prettier', '--tslint --prettier --force --noInstall'));
	it('with-githooks', async () => await defaultIt('tslint-with-githooks', '--tslint --githooks --force --noInstall'));
});
