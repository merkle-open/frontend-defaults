import { defaultIt } from './shared';

describe('commitlint', async () => {
	it('default', async () => await defaultIt('commitlint', '--commitlint --force --noInstall'));
});
