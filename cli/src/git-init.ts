import chalk from 'chalk';
import execa from 'execa';

import ora from './ora-facade';
import { wait } from './wait';

async function existGit(cwd: string) {
	try {
		await execa('git', ['status'], {
			cwd,
		});
		return true;
	} catch (err) {
		return false;
	}
}

export const gitInit = async (cwd: string) => {
	const spinner = ora('Check for existing git repository').start();

	if (await existGit(cwd)) {
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
