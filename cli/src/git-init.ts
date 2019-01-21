import path from 'path';
import chalk from 'chalk';
import execa = require('execa');

import ora from './ora';
import { existDir } from './exist-dir';
import { wait } from './wait';

export const gitInit = async (cwd: string) => {
	const spinner = ora('Check for existing git repository').start();

	if (await existDir(path.join(cwd, '.git'))) {
		spinner.stop();
		return;
	}

	spinner.text = 'Init local git repository';

	try {
		await Promise.all([
			execa('git', ['init'], {
				cwd,
			}),
			wait(1000),
		]);
	} catch (err) {
		spinner.fail(chalk.red(err));
	}

	spinner.succeed();
};
