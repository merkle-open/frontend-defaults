module.exports = {
	root: true,
	extends: ['html-validate:recommended'],
	rules: {
		'doctype-style': 'off',
		'element-required-attributes': 'warn',
		'element-permitted-order': 'warn',
		'no-inline-style': 'off',
		'no-implicit-close': 'warn',
		'no-raw-characters': ['warn', { relaxed: true }],
		'prefer-native-element': 'warn',
		'svg-focusable': 'off',
		'tel-non-breaking': 'off',

		// disable style rules
		'no-trailing-whitespace': 'off',
	},
};
