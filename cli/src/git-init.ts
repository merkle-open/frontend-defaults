import path from 'path';
import execa = require('execa');
import ora from './ora';

import { existFile } from './exist-file';
import { wait } from './wait';
import chalk from 'chalk';

export const gitInit = async (cwd: string) => {
	const spinner = ora('Check for existing git repository').start();

	if (await existFile(path.join(cwd, 'git', 'index'))) {
		spinner.stop();
		return;
	}

	spinner.text = 'Init local git repository';

	try {
		await Promise.all([execa('git', ['init']), wait(1000)]);
	} catch (err) {
		spinner.fail(chalk.red(err));
	}

	spinner.succeed();
};
