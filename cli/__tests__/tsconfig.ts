import { defaultIt } from './shared';

describe('tsconfig', async () => {
	it('default', async () => await defaultIt('tsconfig', '--ts --force --noInstall'));
});
