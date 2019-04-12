/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('commitlint', () => {
	it('default', async () =>
		await apiIt('commitlint', {
			commitlint: true,
		}));
});
