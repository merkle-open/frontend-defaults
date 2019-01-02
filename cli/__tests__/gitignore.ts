import { defaultIt } from './shared';
describe('gitignore', async () => {
	it('default', async () => await defaultIt('tmp-gitignore', '--gitignore --force --noInstall'));
});
