import { apiIt } from './shared';

describe('eslint', async () => {
	it('default', async () =>
		await apiIt('eslint', {
			eslint: true,
		}));
	it('with-prettier', async () =>
		await apiIt('eslint-with-prettier', {
			eslint: true,
			prettier: true,
		}));
	it('with-githooks', async () =>
		await apiIt('eslint-with-githooks', {
			eslint: true,
			githooks: true,
		}));
});
