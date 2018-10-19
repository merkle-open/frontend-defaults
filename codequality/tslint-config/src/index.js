const fs = require('fs');
const rimraf = require('rimraf');
const rules = require('./rules');
const jsRules = require('./jsRules');
const reactRules = require('./reactRules');

rimraf.sync('./build');
fs.mkdirSync('./build');

fs.writeFileSync(
	'./build/tslint.json',
	JSON.stringify(
		{
			defaultSeverity: 'error',
			extends: ['tslint-react'],
			jsRules,
			rules: Object.assign({}, rules, reactRules),
			rulesDirectory: [],
		},
		null,
		2
	)
);
console.log('wrote file build/tslint.json');
