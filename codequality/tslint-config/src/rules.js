module.exports = {
	// tslint:recommended
	'adjacent-overload-signatures': true,
	// tslint:recommended
	align: {
		options: ['parameters', 'statements'],
	},
	// tslint:recommended
	'array-type': {
		options: ['array-simple'],
	},
	// CHANGE: disallow parens with just one arg
	'arrow-parens': {
		options: ['ban-single-arg-parens'],
	},
	// tslint:recommended
	'arrow-return-shorthand': true,
	// tslint:recommended
	'ban-types': {
		options: [
			['Object', 'Avoid using the `Object` type. Did you mean `object`?'],
			['Function', 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'],
			['Boolean', 'Avoid using the `Boolean` type. Did you mean `boolean`?'],
			['Number', 'Avoid using the `Number` type. Did you mean `number`?'],
			['String', 'Avoid using the `String` type. Did you mean `string`?'],
			['Symbol', 'Avoid using the `Symbol` type. Did you mean `symbol`?'],
		],
	},
	// tslint:recommended
	'callable-types': true,
	// tslint:recommended
	'class-name': true,
	// tslint:recommended
	'comment-format': {
		options: ['check-space'],
	},
	// tslint:recommended
	curly: true,
	// tslint:recommended
	'cyclomatic-complexity': false,
	// tslint:recommended
	eofline: true,
	// tslint:recommended
	forin: true,
	// tslint:recommended
	'import-spacing': true,
	// CHANGE: use namics default tabs
	indent: {
		options: ['tabs'],
	},
	// tslint:recommended
	'interface-name': {
		options: ['always-prefix'],
	},
	// tslint:recommended
	'interface-over-type-literal': true,
	// tslint:recommended
	'jsdoc-format': true,
	// tslint:recommended
	'label-position': true,
	// tslint:recommended
	'max-classes-per-file': {
		options: [1],
	},
	// tslint:recommended
	'max-line-length': {
		options: [120],
	},
	// tslint:recommended
	'member-access': true,
	// tslint:recommended
	'member-ordering': {
		options: {
			order: 'statics-first',
		},
	},
	// tslint:recommended
	'new-parens': true,
	// tslint:recommended
	'no-angle-bracket-type-assertion': true,
	// tslint:recommended
	'no-any': false,
	// tslint:recommended
	'no-arg': true,
	// tslint:recommended
	'no-bitwise': true,
	// tslint:recommended
	'no-conditional-assignment': true,
	// tslint:recommended
	'no-consecutive-blank-lines': true,
	// tslint:recommended
	'no-console': true,
	// tslint:recommended
	'no-construct': true,
	// tslint:recommended
	'no-debugger': true,
	// tslint:recommended
	'no-duplicate-super': true,
	// tslint:recommended
	'no-empty': true,
	// tslint:recommended
	'no-empty-interface': true,
	// tslint:recommended
	'no-eval': true,
	// tslint:recommended
	'no-internal-module': true,
	// tslint:recommended
	'no-invalid-this': false,
	// tslint:recommended
	'no-misused-new': true,
	// tslint:recommended
	'no-namespace': true,
	// tslint:recommended
	'no-parameter-properties': false,
	// tslint:recommended
	'no-reference': true,
	// tslint:recommended
	'no-reference-import': true,
	// tslint:recommended
	'no-shadowed-variable': true,
	// tslint:recommended
	'no-string-literal': true,
	// tslint:recommended
	'no-string-throw': true,
	// tslint:recommended
	'no-switch-case-fall-through': false,
	// tslint:recommended
	'no-trailing-whitespace': true,
	// tslint:recommended
	'no-unnecessary-initializer': true,
	// tslint:recommended
	'no-unsafe-finally': true,
	// tslint:recommended
	'no-unused-expression': true,
	// disable this rule as it is very heavy performance-wise and not that useful
	// tslint:recommended
	'no-use-before-declare': false,
	// tslint:recommended
	'no-var-keyword': true,
	// tslint:recommended
	'no-var-requires': true,
	// tslint:recommended
	'object-literal-key-quotes': {
		options: ['consistent-as-needed'],
	},
	// tslint:recommended
	'object-literal-shorthand': true,
	// CHANGE: disabled
	'object-literal-sort-keys': false,
	// tslint:recommended
	'one-line': {
		options: ['check-catch', 'check-else', 'check-finally', 'check-open-brace', 'check-whitespace'],
	},
	// tslint:recommended
	'one-variable-per-declaration': {
		options: ['ignore-for-loop'],
	},
	// tslint:recommended
	'only-arrow-functions': {
		options: ['allow-declarations', 'allow-named-functions'],
	},
	// tslint:recommended
	'ordered-imports': {
		options: {
			'import-sources-order': 'case-insensitive',
			'module-source-path': 'full',
			'named-imports-order': 'case-insensitive',
		},
	},
	// tslint:recommended
	'prefer-const': true,
	// tslint:recommended
	'prefer-for-of': true,
	// tslint:recommended
	quotemark: false,
	// tslint:recommended
	radix: true,
	// tslint:recommended
	semicolon: {
		options: ['always'],
	},
	// tslint:recommended
	'space-before-function-paren': {
		options: {
			anonymous: 'never',
			asyncArrow: 'always',
			constructor: 'never',
			method: 'never',
			named: 'never',
		},
	},
	// tslint:recommended
	'trailing-comma': {
		options: {
			esSpecCompliant: true,
			multiline: 'always',
			singleline: 'never',
		},
	},
	// tslint:recommended
	'triple-equals': {
		options: ['allow-null-check'],
	},
	// tslint:recommended
	typedef: false,
	// tslint:recommended
	'typedef-whitespace': {
		options: [
			{
				'call-signature': 'nospace',
				'index-signature': 'nospace',
				parameter: 'nospace',
				'property-declaration': 'nospace',
				'variable-declaration': 'nospace',
			},
			{
				'call-signature': 'onespace',
				'index-signature': 'onespace',
				parameter: 'onespace',
				'property-declaration': 'onespace',
				'variable-declaration': 'onespace',
			},
		],
	},
	// tslint:recommended
	'typeof-compare': false, // deprecated in TSLint 5.9.0
	// tslint:recommended
	'unified-signatures': true,
	// tslint:recommended
	'use-isnan': true,
	// tslint:recommended
	'variable-name': {
		options: ['ban-keywords', 'check-format', 'allow-pascal-case'],
	},
	// tslint:recommended
	whitespace: {
		options: ['check-branch', 'check-decl', 'check-operator', 'check-separator', 'check-type', 'check-typecast'],
	},
};
