module.exports = {
	extends: [
		'@namics/eslint-config/configurations/typescript-react.js',
		'@namics/eslint-config/configurations/typescript-react-disable-styles.js',
	].map(require.resolve),
};
