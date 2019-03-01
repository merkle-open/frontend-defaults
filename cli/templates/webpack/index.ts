import './polyfill';

(async () => {
	// dynamic import
	const { wait } = await import(/* webpackChunkName: "wait" */ './wait');
	await wait();
	document.write('@namics/frontend-defaults installed');
})();
