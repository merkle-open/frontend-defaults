import api from './api';
import { fetchOptions } from './fetch-options';

(async () => {
	const options = await fetchOptions();
	await api(options);
})();
