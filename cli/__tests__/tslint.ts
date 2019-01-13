import { apiIt } from './shared';

describe('tslint', async () => {
	it('default', async () =>
		await apiIt('tslint', {
			tslint: true,
		}));
	it('with-prettier', async () =>
		await apiIt('tslint-with-prettier', {
			tslint: true,
			prettier: true,
		}));
	it('with-githooks', async () =>
		await apiIt('tslint-with-githooks', {
			tslint: true,
			githooks: true,
		}));
	it('with-prettier-githooks', async () =>
		await apiIt('tslint-with-prettier-githooks', {
			tslint: true,
			prettier: true,
			githooks: true,
		}));
});
