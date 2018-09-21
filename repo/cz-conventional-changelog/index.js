'format cjs';

const engine = require('./engine');
const conventionalCommitTypes = require('conventional-commit-types');

module.exports = engine({
	types: conventionalCommitTypes.types,
});
