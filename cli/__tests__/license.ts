import { defaultIt } from './shared';

describe('license', async () => {
	it('license-open-source', async () =>
		await defaultIt(
			'license-open-source',
			'--licenseOpenSource --copyrightHolder="Namics AG" --force --noInstall'
		));
	it('license-closed-source', async () =>
		await defaultIt('license-closed-source', '--licenseClosedSource --force --noInstall'));
});
