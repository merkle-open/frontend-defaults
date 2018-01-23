'use strict';

const importFrom = require('import-from');

const spacedMessage = (value, desc) => {
	const len = 30 - value.length;
	if (len <= 0) {
		return '';
	}
	return `${value}: ${Array(len).join(' ')}${desc}`;
};

/**
 * @method getPackages
 * @param {Object} cwd - the current working directory (lerna.json)
 * @returns {Object} packagesObject
 **/
function getPackages(cwd) {
	const Repository = importFrom(cwd, 'lerna/lib/Repository');
	const PackageUtilities = importFrom(cwd, 'lerna/lib/PackageUtilities');

	const repository = new Repository(cwd);
	const packages = PackageUtilities.getPackages({
		packageConfigs: repository.packageConfigs,
		rootPath: cwd,
	});

	return packages
		.map(({ name, description = '' }) => {
			const value = name.charAt(0) === '@' ? name.split('/')[1] : name;
			return {
				value,
				name: spacedMessage(value, description || '-'),
			};
		})
		.concat([
			{
				value: 'root',
				name: spacedMessage('DANGER root', 'Changes outside of a package (USE CAREFULLY)'),
			},
			{
				value: '*',
				name: spacedMessage('DANGER *', 'Changes in multiple packages (USE CAREFULLY)'),
			},
		]);
}
module.exports = {
	types: [
		{ value: 'feat', name: spacedMessage('feat', 'A new feature') },
		{ value: 'fix', name: spacedMessage('fix', 'A bug fix') },
		{
			value: 'docs',
			name: spacedMessage('docs', 'Documentation only changes'),
		},
		{
			value: 'style',
			name: spacedMessage(
				'style',
				'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
			),
		},
		{
			value: 'refactor',
			name: spacedMessage('refactor', 'A code change that neither fixes a bug nor adds a feature'),
		},
		{
			value: 'perf',
			name: spacedMessage('pref', 'A code change that improves performance'),
		},
		{
			value: 'test',
			name: spacedMessage('test', 'Adding missing tests or correcting existing tests'),
		},
		{
			value: 'chore',
			name: spacedMessage('chore', "Other changes that don't modify src or test files"),
		},
		{
			value: 'build',
			name: spacedMessage(
				'build',
				'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)'
			),
		},
		{
			value: 'ci',
			name: spacedMessage(
				'ci',
				'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs'
			),
		},
		{
			value: 'revert',
			name: spacedMessage('revert', 'Reverts a previous commit'),
		},
	],

	scopes: getPackages(process.cwd()),

	// it needs to match the value for field type. Eg.: 'fix'
	/*
  scopeOverrides: {
    fix: [

      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
	// override the messages, defaults are as follows
	messages: {
		type: "Select the type of change that you're committing:\n",
		scope: '\nSelect the package (Select "*" for any package and "root" for changes outside of a package):\n',
		// used if allowCustomScopes is true
		customScope: '\nEnter a custom scope:\n',
		subject: 'Write a short imperative tense description of the change:\n',
		body: 'Provide a longer description of the change (optional). Use "|" to break new line:\n',
		breaking: 'List any BREAKING CHANGES (optional):\n',
		footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit: 'Are you sure you want to proceed with the commit above?\n',
	},

	allowCustomScopes: false,
	allowBreakingChanges: ['feat', 'fix'],

	// ticket number input filed as first question
	allowTicketNumber: true,
	isTicketNumberRequired: true,
	ticketNumberPrefix: 'MODERNFE-',
	ticketNumberRegExp: '\\d{1,5}',
};
