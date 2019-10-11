import ora = require('ora');

export default (options?: ora.Options | string) => {
	if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci') {
		const oraInst = {
			start: () => oraInst,
			stop: () => oraInst,
			succeed: () => oraInst,
			fail: () => oraInst,
			warn: () => oraInst,
			info: () => oraInst,
			stopAndPersist: () => oraInst,
			clear: () => oraInst,
			render: () => oraInst,
			frame: () => oraInst,
		};
		return (oraInst as any) as ora.Ora;
	}
	return ora(options);
};
