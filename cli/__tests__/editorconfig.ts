import { apiIt } from './shared';

describe('editorconfig', async () => {
	it('default', async () =>
		await apiIt('editorconfig', {
			editorconfig: true,
		}));
});
