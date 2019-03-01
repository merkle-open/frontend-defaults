import { apiIt } from './shared';

describe('npmrc', async () => {
	it('default', async () =>
		await apiIt('npmrc', {
			npmrc: true,
		}));
});
