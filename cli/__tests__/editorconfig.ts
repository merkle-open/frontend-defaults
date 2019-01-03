import { defaultIt } from './shared';

describe('editorconfig', async () => {
	it('default', async () => await defaultIt('editorconfig', '--editorconfig --force --noInstall'));
});
