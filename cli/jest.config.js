module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: [
		'<rootDir>/__tests__/__snapshots__/',
		'<rootDir>/__tests__/tmp',
		'<rootDir>/__tests__/shared.ts',
	],
	watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/__tests__/tmp', '<rootDir>/build'],
};
