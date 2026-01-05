const config = require('../index.js');

describe('html-validate shared config', () => {
	test('exports an object', () => {
		expect(typeof config).toBe('object');
		expect(config).not.toBeNull();
	});

	test('includes recommended base in extends', () => {
		const ext = config.extends || config.extends;
		// supports string or array
		if (Array.isArray(config.extends)) {
			expect(config.extends).toEqual(expect.arrayContaining(['html-validate:recommended']));
		} else {
			expect(config.extends).toMatch(/html-validate:recommended/);
		}
	});

	test('has some rules defined', () => {
		expect(typeof config.rules).toBe('object');
		expect(config.rules).toHaveProperty('no-inline-style');
	});
});
