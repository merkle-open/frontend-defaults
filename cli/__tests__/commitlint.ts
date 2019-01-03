import { defaultIt, apiIt } from './shared';

describe('commitlint', async () => {
	it('default', async () => await defaultIt('commitlint', '--commitlint --force --noInstall'));
	it('via-api', async () =>
		await apiIt('commitlint-via-api', {
			commitlint: true,
			force: true,
		}));
});
