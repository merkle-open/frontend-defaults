import chalk from 'chalk';
import { prompt } from 'enquirer';

import { IFiles, IMergedFiles } from './merge-files';
import { diffWords } from 'diff';
import { IOptions } from './fetch-options';

const { log } = console;

export const logDiff = (originalFiles: IFiles, mergedFiles: IMergedFiles, { mode, force }: IOptions) => {
	Object.keys(mergedFiles).forEach((fileName: string) => {
		let fileData = mergedFiles[fileName].data;
		let originalFileData = originalFiles[fileName] || '';

		if (typeof fileData === 'object') {
			fileData = JSON.stringify(fileData, null, 2);
		}

		if (typeof originalFileData === 'object') {
			originalFileData = JSON.stringify(originalFileData, null, 2);
		}

		const diff = diffWords(originalFileData, fileData);

		if (mergedFiles[fileName].override && mode !== 'survey' && !force) {
			log(`\n\n  ${chalk.white.underline(fileName)}\n`);
			log(`  ${chalk.red.bold(`add \`--force\` to write this file\n`)}`);
			return;
		}

		log(
			`\n\n  ${chalk.white.underline(fileName)}${
				mergedFiles[fileName].override ? chalk.red(' (OVERRIDE)') : ''
			}\n`
		);

		diff.forEach(({ value, added, removed }) => {
			value.split('\n').forEach((line) => {
				if (added) {
					log(chalk.green(` +  ${line}`));
					return;
				}
				if (removed) {
					log(chalk.red(` -  ${line}`));
					return;
				}
				log(chalk.black(`    ${line}`));
				return;
			});
		});

		log('\n');
	});
};

export const showDiff = async (originalFiles: IFiles, mergedFiles: IMergedFiles, options: IOptions) => {
	if (options.mode !== 'survey' && options.dryRun) {
		await logDiff(originalFiles, mergedFiles, options);
		return false;
	}

	if (options.mode === 'survey') {
		const { showDiff } = (await prompt({
			type: 'confirm',
			name: 'showDiff',
			message: 'Do you want to take a look at the potential changes',
			initial: true,
		})) as { showDiff: boolean };

		if (showDiff) {
			await logDiff(originalFiles, mergedFiles, options);
		}
	}

	return true;
};
