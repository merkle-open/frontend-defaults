module.exports = {
	extends: [
		'@namics/eslint-config/configurations/es8-react.js',
		'@namics/eslint-config/configurations/es8-react-disable-styles.js',
	].map(require.resolve),
};
