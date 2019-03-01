import { apiIt } from './shared';
import { TYPE_CHOICES } from '../src/fetch-survey';

describe('license', async () => {
	it('license-open-source', async () =>
		await apiIt('license-open-source', {
			license: TYPE_CHOICES.licenseOpenSource,
			copyrightHolder: 'Namics AG',
		}));
	it('license-closed-source', async () =>
		await apiIt('license-closed-source', {
			license: TYPE_CHOICES.licenseClosedSource,
		}));
});
