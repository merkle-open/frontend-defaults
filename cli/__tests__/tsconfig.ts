/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('tsconfig', () => {
	it('default', async () =>
		await apiIt('tsconfig', {
			ts: true,
		}));
});
