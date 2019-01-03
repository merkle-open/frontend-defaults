import { defaultIt } from './shared';

describe('npmrc', async () => {
	it('default', async () => await defaultIt('npmrc', '--npmrc --force --noInstall'));
});
