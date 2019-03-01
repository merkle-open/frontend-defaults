import { apiIt } from './shared';

describe('commitlint', async () => {
	it('default', async () =>
		await apiIt('commitlint', {
			commitlint: true,
		}));
});
