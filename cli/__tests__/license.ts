import { defaultIt } from './shared';

describe('licenseMIT', async () => {
	it('default', async () => await defaultIt('licenseMIT', '--licenseMIT="Namics AG" --force --noInstall'));
});
