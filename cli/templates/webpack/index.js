import '@babel/polyfill';

(async () => {
	// dynamic import
	// eslint-disable-next-line no-inline-comments
	const { wait } = await import(/* webpackChunkName: "wait" */ './wait');
	await wait();
	document.write('@namics/frontend-defaults installed');
})();
