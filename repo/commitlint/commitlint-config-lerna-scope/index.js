const config = require('../../commitizen/commitizen-config-lerna-scope');

module.exports = {
	rules: {
		'scope-enum': () => [2, 'always', config.scopes.map(scope => scope.value)],
	},
};
