import { defaultIt } from './shared';
describe('gitignore', async () => {
	it('default', async () => await defaultIt('gitignore', '--gitignore --force --noInstall'));
});
