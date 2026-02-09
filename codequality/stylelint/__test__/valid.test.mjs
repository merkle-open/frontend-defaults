import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import stylelint from 'stylelint';
import config from '../index.js';

describe('flags no errors with valid css', () => {
	const files = '__test__/valid/*.scss';
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			files,
			config,
		});
	});

	it('did not error', () => {
		assert.equal(result.errored, false);
	});

	it('no issues found', () => {
		assert.equal(result.results[0].warnings.length, 0);
		assert.equal(result.results[1].warnings.length, 0);
		assert.equal(result.results[2].warnings.length, 0);
		assert.equal(result.results[4].warnings.length, 0);
		assert.equal(result.results[5].warnings.length, 0);
		assert.equal(result.results[6].warnings.length, 0);
		assert.equal(result.results[7].warnings.length, 0);
		assert.equal(result.results[8].warnings.length, 0);
		assert.equal(result.results[9].warnings.length, 0);
		assert.equal(result.results[10].warnings.length, 0);
		assert.equal(result.results[11].warnings.length, 0);
		assert.equal(result.results[12].warnings.length, 0);
		assert.equal(result.results[14].warnings.length, 0);
	});

	it('flags warnings in custom-properties.scss', () => {
		assert.equal(result.results[3].warnings.length, 2);
	});

	it('flags a todo warning in slick.scss', () => {
		assert.equal(result.results[13].warnings.length, 1);
	});
});
