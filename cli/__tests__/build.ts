/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('build', () => {
	it('default', async () =>
		await apiIt('build', {
			build: true,
			force: true,
		}));
	it('build-with-ts', async () =>
		await apiIt('build-with-ts', {
			ts: true,
			build: true,
			force: true,
		}));
});
