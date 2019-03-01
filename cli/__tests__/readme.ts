import { apiIt } from './shared';
import { TYPE_CHOICES } from '../src/fetch-survey';

describe('readme', async () => {
	it('open-source', async () =>
		await apiIt('readme-open-source', {
			readme: true,
			license: TYPE_CHOICES.licenseOpenSource,
			copyrightHolder: 'Namics AG',
		}));
	it('closed-source', async () =>
		await apiIt('readme-closed-source', {
			readme: true,
			license: TYPE_CHOICES.licenseClosedSource,
		}));
});
