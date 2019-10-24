import path from 'path';

import { fetchTemplate } from './fetch-template';
import { TYPE_CHOICES, IOptions } from './const';

const createReadme = async ({ cwd, readme, license, copyrightHolder }: IOptions): Promise<{ 'README.md'?: string }> => {
	if (!readme) {
		return {};
	}

	if (license === TYPE_CHOICES.licenseClosedSource) {
		const template = await fetchTemplate('readme', 'README_closed-source.md');
		return {
			'README.md': template.replace(new RegExp('PROJECT_NAME', 'g'), path.basename(cwd)),
		};
	}

	let template = await fetchTemplate('readme', 'README_open-source.md');
	template = template.replace(new RegExp('PROJECT_NAME', 'g'), path.basename(cwd));
	if (copyrightHolder) {
		template = template.replace(new RegExp('COPYRIGHT_HOLDER', 'g'), copyrightHolder);
	}
	return {
		'README.md': template,
	};
};

export const create = async (options: IOptions) => {
	const readme = await createReadme(options);
	return {
		...readme,
	};
};
