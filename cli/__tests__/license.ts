import { defaultIt } from './shared';

describe('license', async () => {
	it('default', async () => await defaultIt('license', '--license="Namics AG" --force --noInstall'));
});
