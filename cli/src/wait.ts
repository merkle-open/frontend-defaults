export const wait = (delay: number = 150): Promise<void> => {
	if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci') {
		return Promise.resolve();
	}
	return new Promise((resolve) => setTimeout(resolve, delay));
};
