import { defaultIt } from './shared';

describe('npmrc', async () => {
	it('default', async () => await defaultIt('tmp-npmrc', '--npmrc --force --noInstall'));
});
