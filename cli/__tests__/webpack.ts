/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('webpack', () => {
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
