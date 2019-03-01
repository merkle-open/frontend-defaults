import { apiIt } from './shared';

describe('gitignore', async () => {
	it('default', async () =>
		await apiIt('gitignore', {
			gitignore: true,
		}));
});
