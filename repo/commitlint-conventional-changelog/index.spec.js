const execa = require('execa');

describe('commitlint', () => {
	test('chore(test): message => valid'.replace(/\n/g, ' '), async () => {
		const out = (await execa.shell(`echo \"chore(test): message\" | node_modules/.bin/commitlint`)).stdout;
		expect(out.toString().includes('found 0 problems, 0 warnings')).toBe(true);
	});
	test('chore: message => valid'.replace(/\n/g, ' '), async () => {
		const out = (await execa.shell(`echo \"chore: message\" | node_modules/.bin/commitlint`)).stdout;
		expect(out.toString().includes('found 0 problems, 0 warnings')).toBe(true);
	});
	test('chore(scope): message\n\ndetails\n\nBREAKING CHANGE: something => valid'.replace(/\n/g, ' '), async () => {
		const out = (await execa.shell(
			`echo \"chore(scope): message\n\ndetails\n\nBREAKING CHANGE: something\" | node_modules/.bin/commitlint`
		)).stdout;
		expect(out.toString().includes('found 0 problems, 0 warnings')).toBe(true);
	});
	test('chore(scope): message\n\nBREAKING CHANGE: something => valid'.replace(/\n/g, ' '), async () => {
		const out = (await execa.shell(
			`echo \"chore(scope): message\n\nBREAKING CHANGE: something\" | node_modules/.bin/commitlint`
		)).stdout;
		expect(out.toString().includes('found 0 problems, 0 warnings')).toBe(true);
	});
	test('chore(scope): message [ISSUE-1234] => valid'.replace(/\n/g, ' '), async () => {
		const out = (await execa.shell(`echo \"chore(scope): message [ISSUE-1234]\" | node_modules/.bin/commitlint`))
			.stdout;
		expect(out.toString().includes('found 0 problems, 0 warnings')).toBe(true);
	});
	test(' : message => invalid'.replace(/\n/g, ' '), async () => {
		try {
			const out = (await execa.shell(`echo \" : message\" | node_modules/.bin/commitlint`)).stdout;
		} catch (err) {
			expect(err.toString().includes('type may not be empty')).toBe(true);
		}
	});
	test('bugfix: message => invalid'.replace(/\n/g, ' '), async () => {
		try {
			const out = (await execa.shell(`echo \"bugfix: message\" | node_modules/.bin/commitlint`)).stdout;
		} catch (err) {
			expect(
				err
					.toString()
					.includes(
						'type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]'
					)
			).toBe(true);
		}
	});
	test('chore: Message => invalid'.replace(/\n/g, ' '), async () => {
		try {
			const out = (await execa.shell(`echo \"chore: Message\" | node_modules/.bin/commitlint`)).stdout;
		} catch (err) {
			expect(
				err.toString().includes('subject must not be sentence-case, start-case, pascal-case, upper-case')
			).toBe(true);
		}
	});
});
