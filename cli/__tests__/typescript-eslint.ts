/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('typescript-eslint', () => {
	it('default', async () =>
		await apiIt('typescript-eslint', {
			ts: true,
			eslint: true,
		}));
	it('with-prettier', async () =>
		await apiIt('typescript-eslint-with-prettier', {
			ts: true,
			eslint: true,
			prettier: true,
		}));
	it('with-githooks', async () =>
		await apiIt('typescript-eslint-with-githooks', {
			ts: true,
			eslint: true,
			githooks: true,
		}));
});
