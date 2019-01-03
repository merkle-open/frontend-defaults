import { defaultIt } from './shared';

describe('readme', async () => {
	it('default', async () => await defaultIt('readme', '--readme --force --noInstall'));
});
