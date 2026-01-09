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
		expect(result.results[2].warnings).toHaveLength(0);
		expect(result.results[3].warnings).toHaveLength(0);
		expect(result.results[4].warnings).toHaveLength(0);
		expect(result.results[5].warnings).toHaveLength(0);
		expect(result.results[6].warnings).toHaveLength(0);
		expect(result.results[7].warnings).toHaveLength(0);
		expect(result.results[8].warnings).toHaveLength(0);
		expect(result.results[9].warnings).toHaveLength(0);
		expect(result.results[10].warnings).toHaveLength(0);
		expect(result.results[11].warnings).toHaveLength(0);
		expect(result.results[12].warnings).toHaveLength(1);
		expect(result.results[13].warnings).toHaveLength(0);
	});
});
