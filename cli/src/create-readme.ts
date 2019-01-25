import path from 'path';

import { fetchTemplate } from './fetch-template';
import { IOptions } from './fetch-options';
import { TYPE_CHOICES } from './fetch-survey';

const createReadme = async ({ cwd, readme, license, copyrightHolder }: IOptions): Promise<{ 'README.md'?: string }> => {
	if (!readme) {
		return {};
	}

	if (license === TYPE_CHOICES.licenseClosedSource) {
		return {
			'README.md': (await fetchTemplate('readme', 'README_closed-source.md')).replace(
				new RegExp('PROJECT_NAME', 'g'),
				path.basename(cwd)
			),
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

export const create = async (options: IOptions) => ({
	...(await createReadme(options)),
});
