const stylelint = require('stylelint');
const config = require('../');

describe('flags no errors with valid css', () => {
	const files = 'tests/valid/*.scss';
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			files,
			config,
		});
	});

	it('did not error', () => {
		expect(result.errored).toBe(false);
	});

	it('flags a todo warning in slick.scss', () => {
		expect(result.results[0].warnings).toHaveLength(0);
		expect(result.results[1].warnings).toHaveLength(0);
		expect(result.results[2].warnings).toHaveLength(1);
	});
});
