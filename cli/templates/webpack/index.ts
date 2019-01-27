import './polyfill';

async function wait(delay: number = 500) {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

(async () => {
	await wait();
	document.write('@namics/frontend-defaults installed');
})();
