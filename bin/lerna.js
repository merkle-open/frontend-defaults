const path = require('path');
const execa = require('execa');
const globby = require('globby');

const fs = require('./fs');
const cwd = fs.realpathSync(process.cwd());

async function list() {
	return (await execa('lerna', ['list'], { cwd })).stdout.trim().split('\n');
}

async function configJson() {
	return JSON.parse(await fs.readFile(path.join(cwd, 'lerna.json'), 'utf8'));
}

async function packages() {
	const config = await configJson();
	return await globby(config.packages.map((pathName) => path.join(pathName, 'package.json')), { cwd });
}

module.exports.list = list;
module.exports.configJson = configJson;
module.exports.packages = packages;
