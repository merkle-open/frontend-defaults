/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-dependencies
const { PluginDependencies } = require('@dash4/plugin-dependencies');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme
const { PluginReadme } = require('@dash4/plugin-readme');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts
const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal
const { PluginTerminal, jestCommands } = require('@dash4/plugin-terminal');

async function getConfig() {
	return {
		port: 8080,
		tabs: [
			{
				title: 'root',
				rows: [
					[new PluginReadme({ file: 'README.md', width: [12, 10, 6] })],
					[
						new PluginDependencies({
							lerna: 'lerna.json',
							installProcess: { title: 'run install', cmd: 'npm install' },
							width: [12, 6, 8],
						}),
						new PluginNpmScripts({
							width: [12, 6, 4],
							scripts: [
								{ title: 'install', cmd: 'npm install' },
								{ title: 'bootstrap', cmd: 'npm run bootstrap' },
								{ title: 'build', cmd: 'npm run build' },
								{ title: 'test', cmd: 'npm run test' },
								{ title: 'lint', cmd: 'npm run lint' },
								{ title: 'clean', cmd: 'npm run clean' },
								{ title: 'prettier', cmd: 'npm run prettier' },
							],
						}),
					],
				],
			},
			{
				title: 'prettier-config',
				rows: [[new PluginReadme({ file: 'codequality/prettier/README.md', width: [12, 10, 6] })]],
			},
			{
				title: 'stylelint-config',
				rows: [[new PluginReadme({ file: 'codequality/stylelint/README.md', width: [12, 10, 6] })]],
			},
			{
				title: 'ts-config',
				rows: [[new PluginReadme({ file: 'codequality/ts-config/README.md', width: [12, 10, 6] })]],
			},
			{
				title: 'commitlint-conventional-changelog',
				rows: [
					[
						new PluginReadme({
							file: 'repo/commitlint-conventional-changelog/README.md',
							width: [12, 10, 6],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: 'repo/commitlint-conventional-changelog',
							allowedCommands: jestCommands,
							width: [12, 6, 8],
						}),
						new PluginNpmScripts({
							scripts: [
								{ title: 'test', cmd: 'npm run test', cwd: 'repo/commitlint-conventional-changelog' },
							],
							width: [12, 6, 4],
						}),
					],
				],
			},
			{
				title: 'cz-conventional-changelog',
				rows: [[new PluginReadme({ file: 'repo/cz-conventional-changelog/README.md', width: [12, 10, 6] })]],
			},
			{
				title: 'frontend-defaults-cli',
				rows: [
					[new PluginReadme({ file: 'cli/README.md', width: [12, 10, 6] })],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: 'cli',
							allowedCommands: jestCommands,
							width: [12, 6, 8],
						}),

						new PluginNpmScripts({
							width: [12, 6, 4],
							scripts: [
								{ title: 'build', cmd: 'npm run build', cwd: 'cli' },
								{ title: 'watch', cmd: 'npm run watch', cwd: 'cli' },
								{ title: 'test', cmd: 'npm run test', cwd: 'cli' },
							],
						}),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
