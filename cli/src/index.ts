import api from './api';
import { fetchOptions } from './fetch-options';

(async () => {
	await api(await fetchOptions());
})();
