import { defaultIt } from './shared';

describe('editorconfig', async () => {
	it('default', async () => await defaultIt('tmp-editorconfig', '--editorconfig --force --noInstall'));
});
