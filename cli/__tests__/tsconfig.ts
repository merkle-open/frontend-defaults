import { apiIt } from './shared';

describe('tsconfig', async () => {
	it('default', async () =>
		await apiIt('tsconfig', {
			ts: true,
		}));
});
