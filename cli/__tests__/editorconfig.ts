/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('editorconfig', () => {
	it('default', async () =>
		await apiIt('editorconfig', {
			editorconfig: true,
		}));
});
