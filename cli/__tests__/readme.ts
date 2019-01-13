import { apiIt } from './shared';

describe('readme', async () => {
	it('default', async () =>
		await apiIt('readme', {
			readme: true,
		}));
});
