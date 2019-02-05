const path = require('path');
const conventionalChangelog = require('conventional-changelog');
const conventionalRecommendedBump = require(`conventional-recommended-bump`);
const { prompt } = require('enquirer');
const globby = require('globby');
const ora = require('ora');
const execa = require('execa');

const config = require('../repo/commitlint-conventional-changelog/index');
const fs = require('./fs');
const lerna = require('./lerna');
const cwd = fs.realpathSync(process.cwd());

async function getRecommendedBump() {
	return new Promise((resolve, reject) => {
		conventionalRecommendedBump({ preset: `angular` }, (error, recommendation) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(recommendation.releaseType);
		});
	});
}

async function streamToString(stream) {
	const chunks = [];
	return new Promise((resolve, reject) => {
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('error', reject);
		stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
	});
}

async function getChangelog() {
	return new Promise((resolve, reject) => {
		try {
			const stream = conventionalChangelog({ config });
			const changelog = streamToString(stream);
			resolve(changelog);
		} catch (err) {
			reject(err);
		}
	});
}

async function getPackageData() {
	return await require(path.join(cwd, 'package.json'));
}

function bumpVersion(currentVersion, releaseType) {
	if (releaseType !== 'major' && releaseType !== 'minor' && releaseType != 'patch') {
		return currentVersion;
	}

	const releaseTypeMap = {
		major: 0,
		minor: 1,
		patch: 2,
	};
	const version = currentVersion.split('.');

	version[releaseTypeMap[releaseType]] = parseInt(version[releaseTypeMap[releaseType]], 10) + 1;

	return version.join('.');
}

async function writeChangelog(changelog) {
	const pathName = path.join(cwd, 'CHANGELOG.md');
	let oldChangelog = '';

	try {
		oldChangelog = await fs.readFile(pathName, 'utf8');
	} catch (err) {}

	await fs.writeFile(pathName, `${changelog}\n\n${oldChangelog}`);
}

async function promptVersion(recommendedVersion) {
	return (await prompt({
		type: 'input',
		name: 'version',
		message: 'Enter version',
		initial: recommendedVersion,
	})).version;
}

async function bumpPackage(pathName, newVersion) {
	const packageDataString = await fs.readFile(path.join(cwd, pathName), 'utf8');
	const useTabs = packageDataString.includes('\t');
	const packageData = JSON.parse(packageDataString);

	if (!packageData || !packageData.version) {
		return;
	}
	packageData.version = newVersion;

	await fs.writeFile(path.join(cwd, pathName), JSON.stringify(packageData, null, useTabs ? '\t' : 2));
}

async function bumpDependencies(pathName, updatedDependencies, newVersion) {
	const packageDataString = await fs.readFile(path.join(cwd, pathName), 'utf8');
	const useTabs = packageDataString.includes('\t');
	const packageData = JSON.parse(packageDataString);

	updatedDependencies.forEach((updatedDependency) => {
		if (packageData.dependencies && packageData.dependencies[updatedDependency]) {
			packageData.dependencies[updatedDependency] = newVersion;
		}
		if (packageData.devDependencies && packageData.devDependencies[updatedDependency]) {
			packageData.devDependencies[updatedDependency] = newVersion;
		}
	});

	await fs.writeFile(path.join(cwd, pathName), JSON.stringify(packageData, null, useTabs ? '\t' : 2));
}

async function commitRelease(newVersion) {
	await execa('git', ['commit', '-m', `chore: release v${newVersion}`]);
}

async function createTag(newVersion) {
	await execa('git', ['tag', newVersion]);
}

(async () => {
	const packageTemplateFiles = await globby(
		[
			'cli/templates/**/package.json',
			'cli/templates/**/package-*.json',
			'!**/package-lock.json',
			'!**/node_modules',
			'!**/__tests__',
		],
		{ cwd }
	);
	const lernaPackageFiles = await lerna.packages();

	const packageJson = await getPackageData();
	const recommendBump = await getRecommendedBump();
	const newVersion = await promptVersion(bumpVersion(packageJson.version, recommendBump));

	const spinners = [
		ora('bump packages'),
		ora('update dependencies in template files'),
		ora('write changelog'),
		ora('commit'),
		ora('create tag'),
	];

	// bump packages
	spinners[0].start();
	try {
		await Promise.all(
			lernaPackageFiles
				.concat([path.join('package.json')])
				.map(async (pathName) => await bumpPackage(pathName, newVersion))
		);
	} catch (err) {
		spinners[0].fail(err);
		process.exit(1);
		return;
	}
	spinners[0].succeed();

	// bump dependencies in template files
	spinners[1].start();
	try {
		await Promise.all(
			packageTemplateFiles.map(
				async (pathName) => await bumpDependencies(pathName, await lerna.list(), newVersion)
			)
		);
	} catch (err) {
		spinners[1].fail(err);
		process.exit(1);
		return;
	}
	spinners[1].succeed();

	// write changelog
	spinners[2].start();
	try {
		const changelog = await getChangelog();
		await writeChangelog(changelog);
	} catch (err) {
		spinners[2].fail(err);
		process.exit(1);
		return;
	}
	spinners[2].succeed();

	// commit
	spinners[3].start();
	try {
		await commitRelease(newVersion);
	} catch (err) {
		spinners[3].fail(err);
		process.exit(1);
		return;
	}
	spinners[3].succeed();

	// create tag
	spinners[4].start();
	try {
		await createTag(newVersion);
	} catch (err) {
		spinners[4].fail(err);
		process.exit(1);
		return;
	}
	spinners[4].succeed();
})();
