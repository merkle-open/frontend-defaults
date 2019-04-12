/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('npmrc', () => {
	it('default', async () =>
		await apiIt('npmrc', {
			npmrc: true,
		}));
});
