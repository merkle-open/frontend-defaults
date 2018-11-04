module.exports = {
	// tslint-react:recommended
	'jsx-alignment': true,
	// CHANGE: 2018.11.03 enabled with 'never' because `<input disabled />` is quite common
	'jsx-boolean-value': [true, 'never'],
	// tslint-react:recommended
	'jsx-curly-spacing': [true, 'never'],
	// tslint-react:recommended
	'jsx-equals-spacing': [true, 'never'],
	// tslint-react:recommended
	'jsx-key': true,
	// tslint-react:recommended
	'jsx-no-bind': true,
	// CHANGE: 2018.11.03 disabled because is needed for render prop functions
	'jsx-no-lambda': false,
	// CHANGE: 2018.11.03 disabled because multiline-js is helpfull
	'jsx-no-multiline-js': false,
	// tslint-react:recommended
	'jsx-no-string-ref': true,
	// tslint-react:recommended
	'jsx-self-close': true,
	// tslint-react:recommended
	'jsx-wrap-multiline': true,
};
