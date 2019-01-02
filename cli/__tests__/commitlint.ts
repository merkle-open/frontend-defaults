import { defaultIt } from './shared';

describe('commitlint', async () => {
	it('default', async () => await defaultIt('tmp-commitlint', '--commitlint --force --noInstall'));
});
