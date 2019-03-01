import chalk from 'chalk';
import { prompt } from 'enquirer';

import { IFiles, IMergedFiles } from './merge-files';
import { diffLines } from 'diff';
import { IOptions } from './fetch-options';

const { log } = console;

const logLine = (line: number, value: string) =>
	log(`${chalk.gray(`${line.toString().padStart(5, ' ')} │ `)}${chalk.white(`    ${value}`)}`);
const logLineAdded = (line: number, value: string) =>
	log(`${chalk.gray(`${line.toString().padStart(5, ' ')} │ `)}${chalk.green(` +  ${value}`)}`);
const logLineRemoved = (line: number, value: string) =>
	log(`${chalk.gray(`${line.toString().padStart(5, ' ')} │ `)}${chalk.red(` -  ${value}`)}`);
const logLineSpacer = () => log('');

interface IResult {
	value: string;
	added?: boolean;
	removed?: boolean;
	lineNumber: number;
	addedLineNumber: number;
	removedLineNumber: number;
}

export const logDiffJsonStrings = (objA: string, objB: string) => {
	const diff = diffLines(objA, objB);

	const results: IResult[] = [];
	let lineNumber = 0;
	let addedLineNumber = 0;
	let removedLineNumber = 0;

	diff.forEach(({ value, added, removed }) => {
		value
			.replace(/\n$/g, '')
			.split('\n')
			.forEach((line) => {
				if (added) {
					addedLineNumber += 1;
				} else if (removed) {
					removedLineNumber += 1;
				} else {
					lineNumber += 1;
				}

				results.push({
					value: line,
					added,
					removed,
					lineNumber,
					addedLineNumber,
					removedLineNumber,
				});
			});
	});

	let unchangedResults: IResult[] = [];

	results.forEach((result, index) => {
		const { value, added, removed, lineNumber, addedLineNumber, removedLineNumber } = result;

		if (added) {
			logLineAdded(lineNumber + addedLineNumber, value);
			unchangedResults = [];
			return;
		}

		if (removed) {
			logLineRemoved(lineNumber + removedLineNumber, value);
			unchangedResults = [];
			return;
		}

		unchangedResults.push(result);

		if (
			index === results.length - 1 ||
			(results[index + 1] && (results[index + 1].added || results[index + 1].removed))
		) {
			if (unchangedResults.length <= 3) {
				unchangedResults.forEach((resultInner) => {
					logLine(resultInner.lineNumber + resultInner.addedLineNumber, resultInner.value);
				});
				return;
			}
			logLine(unchangedResults[0].lineNumber + unchangedResults[0].addedLineNumber, unchangedResults[0].value);
			logLineSpacer();
			logLine(
				unchangedResults[unchangedResults.length - 1].lineNumber +
					unchangedResults[unchangedResults.length - 1].addedLineNumber,
				unchangedResults[unchangedResults.length - 1].value
			);
		}
	});

	log('\n');
};

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

		logDiffJsonStrings(originalFileData, fileData);
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
			initial: false,
		})) as { showDiff: boolean };

		if (showDiff) {
			await logDiff(originalFiles, mergedFiles, options);
		}
	}

	return true;
};
