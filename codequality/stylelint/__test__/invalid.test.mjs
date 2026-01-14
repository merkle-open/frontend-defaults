import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import stylelint from 'stylelint';
import config from '../index.js';

describe('flags errors with invalid css', () => {
	const files = '__test__/invalid/*.scss';
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			files,
			config,
		});
	});

	it('did error', () => {
		assert.equal(result.errored, true);
	});

	it('flags warnings', () => {
		assert.equal(result.results[0].warnings.length, 6);
	});

	it('correct warning text', () => {
		assert.equal(
			result.results[0].warnings[0].text,
			'Expected class name "selector" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (plugin/stylelint-bem-namics)',
		);
		assert.equal(
			result.results[0].warnings[1].text,
			'Expected class name "z-selector" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (plugin/stylelint-bem-namics)',
		);
		assert.equal(
			result.results[0].warnings[2].text,
			'Expected modern color-function notation (color-function-notation)',
		);
		assert.equal(result.results[0].warnings[3].text, 'Unexpected named color "darkgray" (color-named)');
		assert.equal(result.results[0].warnings[4].text, 'Unexpected !important (declaration-no-important)');
		assert.equal(
			result.results[0].warnings[5].text,
			'Expected "#FOO" to have no more than 0 ID selectors (selector-max-id)',
		);
	});

	it('correct rule flagged', () => {
		assert.equal(result.results[0].warnings[0].rule, 'plugin/stylelint-bem-namics');
		assert.equal(result.results[0].warnings[1].rule, 'plugin/stylelint-bem-namics');
		assert.equal(result.results[0].warnings[2].rule, 'color-function-notation');
		assert.equal(result.results[0].warnings[3].rule, 'color-named');
		assert.equal(result.results[0].warnings[4].rule, 'declaration-no-important');
		assert.equal(result.results[0].warnings[5].rule, 'selector-max-id');
	});


	it('correct severity flagged', () => {
		assert.equal(result.results[0].warnings[0].severity, 'error');
		assert.equal(result.results[0].warnings[1].severity, 'error');
		assert.equal(result.results[0].warnings[2].severity, 'warning');
	});

	it('correct line number', () => {
		assert.equal(result.results[0].warnings[0].line, 12);
		assert.equal(result.results[0].warnings[1].line, 14);
		assert.equal(result.results[0].warnings[2].line, 7);
		assert.equal(result.results[0].warnings[3].line, 4);
	});

	it('correct column number', () => {
		assert.equal(result.results[0].warnings[0].column, 1);
		assert.equal(result.results[0].warnings[1].column, 1);
		assert.equal(result.results[0].warnings[2].column, 22);
		assert.equal(result.results[0].warnings[3].column, 9);
	});
});
