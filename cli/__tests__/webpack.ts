import { apiIt } from './shared';

describe('webpack', async () => {
	it('default', async () =>
		await apiIt('webpack', {
			webpack: true,
			force: true,
		}));
	it('webpack-with-ts', async () =>
		await apiIt('webpack-with-ts', {
			ts: true,
			webpack: true,
			force: true,
		}));
});
