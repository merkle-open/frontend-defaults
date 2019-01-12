const promptMap = new Map();

export function promptCache<T extends Function>(question: T): T {
	return <any>function () {
		if (promptMap.has(question)) {
			return promptMap.get(question) as T;
		}
		const result = question.apply(this, arguments) as T;
		promptMap.set(question, result);
		return result;
	};
}
