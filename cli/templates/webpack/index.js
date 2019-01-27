import '@babel/polyfill';

/**
 * 
 * @param {number} delay - delay in milliseconds
 * @returns {void}
 */
async function wait(delay = 500) {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

(async () => {
	await wait();
	document.write('@namics/frontend-defaults installed');
})();
