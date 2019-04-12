/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('gitignore', () => {
	it('default', async () =>
		await apiIt('gitignore', {
			gitignore: true,
		}));
});
