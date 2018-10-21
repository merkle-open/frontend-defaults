const fs = require('fs');
const rimraf = require('rimraf');
const tsRules = require('../src/tsRules');
const reactRules = require('../src/reactRules');

rimraf.sync('./build');
fs.mkdirSync('./build');

// TSLint does not allow merging configs
// therefore we built `build/tslint.json` from `jsRules.js`, `rules.js` and `reactRules.js`
fs.writeFileSync(
	'./build/tslint.json',
	JSON.stringify(
		{
			defaultSeverity: 'error',
			extends: ['tslint-react'],
			rules: Object.assign({}, tsRules, reactRules),
			rulesDirectory: [],
		},
		null,
		2
	)
);
console.log('wrote file build/tslint.json');
