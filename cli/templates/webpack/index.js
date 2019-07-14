import '@babel/polyfill';
import './styles.scss';

(async () => {
	// dynamic import
	const { wait } = await import(/* webpackChunkName: "wait" */ './wait');
	await wait();
	document.body.innerHTML =
		'<h1 class="m-title">@namics/frontend-defaults. <span class="m-title__highlight">Installed.</span></h1>';
})();
