const stylelint = require('stylelint');
const config = require('../');

// needs bigger timeout
jest.setTimeout(10000);

describe('flags errors with invalid css', () => {
	const files = 'tests/invalid/examples.scss';
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			files,
			config,
		});
	});

	it('did error', () => {
		expect(result.errored).toBe(true);
	});

	it('flags warnings', () => {
		expect(result.results[0].warnings).toHaveLength(9);
	});

	it('correct warning text', () => {
		expect(result.results[0].warnings.map((w) => w.text)).toEqual([
			'Expected class name "selector" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (plugin/stylelint-bem-namics)',
			'Expected class name "z-selector" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (plugin/stylelint-bem-namics)',
			'Expected modern color-function notation (color-function-notation)',
			'Expected "#CCC" to be "#ccc" (color-hex-case)',
			'Unexpected named color "darkgray" (color-named)',
			'Unexpected !important (declaration-no-important)',
			'Expected a leading zero (number-leading-zero)',
			'Expected "#FOO" to have no more than 0 ID selectors (selector-max-id)',
			'Expected single quotes (string-quotes)',
		]);
	});

	it('correct rule flagged', () => {
		expect(result.results[0].warnings.map((w) => w.rule)).toEqual([
			'plugin/stylelint-bem-namics',
			'plugin/stylelint-bem-namics',
			'color-function-notation',
			'color-hex-case',
			'color-named',
			'declaration-no-important',
			'number-leading-zero',
			'selector-max-id',
			'string-quotes',
		]);
	});

	it('correct severity flagged', () => {
		expect(result.results[0].warnings[0].severity).toBe('error');
		expect(result.results[0].warnings[1].severity).toBe('error');
		expect(result.results[0].warnings[2].severity).toBe('warning');
	});

	it('correct line number', () => {
		expect(result.results[0].warnings[0].line).toBe(12);
		expect(result.results[0].warnings[1].line).toBe(14);
		expect(result.results[0].warnings[2].line).toBe(7);
		expect(result.results[0].warnings[3].line).toBe(5);
	});

	it('correct column number', () => {
		expect(result.results[0].warnings[0].column).toBe(1);
		expect(result.results[0].warnings[1].column).toBe(1);
		expect(result.results[0].warnings[2].column).toBe(22);
		expect(result.results[0].warnings[3].column).toBe(20);
	});
});
