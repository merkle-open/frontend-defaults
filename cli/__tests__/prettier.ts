import { apiIt } from './shared';

describe('prettier', async () => {
	it('default', async () =>
		await apiIt('prettier', {
			prettier: true,
		}));
	it('with-githooks', async () =>
		await apiIt('prettier-with-githooks', {
			prettier: true,
			githooks: true,
		}));
});
