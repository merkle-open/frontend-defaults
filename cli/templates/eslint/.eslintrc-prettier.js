module.exports = {
	extends: [
		'./.eslintrc.strict.js',
	].map(require.resolve),
	/* define rules for IDE only here https://github.com/namics/frontend-defaults/issues/12 */
	rules: {
		'no-console': 1
	}
};
