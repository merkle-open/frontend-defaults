/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('node-version', () => {
	it('default', async () =>
		await apiIt('node-version', {
			nodeVersion: true,
		}));
	it('with-githooks', async () =>
		await apiIt('node-version-with-githooks', {
			nodeVersion: true,
			githooks: true,
		}));
});
