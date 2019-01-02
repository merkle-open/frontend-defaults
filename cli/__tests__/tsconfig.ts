import { defaultIt } from './shared';

describe('tsconfig', async () => {
	it('default', async () => await defaultIt('tmp-tsconfig', '--ts --force --noInstall'));
});
