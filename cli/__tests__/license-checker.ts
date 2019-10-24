/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('license-checker', () => {
	it('default', async () =>
		await apiIt('license-checker', {
			licenseChecker: true,
		}));
});
