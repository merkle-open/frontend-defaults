const lint = require('@commitlint/lint').default;
const rules = require('./index').rules;

describe('commitlint', () => {
	test('chore(test): message => valid'.replace(/\n/g, ' '), async () => {
		const { valid } = await lint('chore(test): message', rules);
		expect(valid).toBe(true);
	});
	test('chore: message => valid'.replace(/\n/g, ' '), async () => {
		const { valid } = await lint('chore: message', rules);
		expect(valid).toBe(true);
	});
	test('chore(scope): message\n\ndetails\n\nBREAKING CHANGE: something => valid'.replace(/\n/g, ' '), async () => {
		const { valid } = await lint('chore(scope): message\n\ndetails\n\nBREAKING CHANGE: something', rules);
		expect(valid).toBe(true);
	});
	test('chore(scope): message\n\nBREAKING CHANGE: something => valid'.replace(/\n/g, ' '), async () => {
		const { valid } = await lint('chore(scope): message\n\nBREAKING CHANGE: something', rules);
		expect(valid).toBe(true);
	});
	test('chore(scope): message [ISSUE-1234] => valid'.replace(/\n/g, ' '), async () => {
		const { valid } = await lint('chore(scope): message [ISSUE-1234]', rules);
		expect(valid).toBe(true);
	});
	test(' : message => invalid'.replace(/\n/g, ' '), async () => {
		const { errors, valid } = await lint(' : message', rules);
		expect(valid).toBe(false);
		expect(errors.map(({ name }) => name)).toEqual(['subject-empty', 'type-empty']);
	});
	test('bugfix: message => invalid'.replace(/\n/g, ' '), async () => {
		const { errors, valid } = await lint('bugfix: message', rules);
		expect(valid).toBe(false);
		expect(errors.map(({ name }) => name)).toEqual(['type-enum']);
	});
	test('chore: Message => invalid'.replace(/\n/g, ' '), async () => {
		const { errors, valid } = await lint('chore: Message', rules);
		expect(valid).toBe(false);
		expect(errors.map(({ name }) => name)).toEqual(['subject-case']);
	});
});
