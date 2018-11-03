(() => {
	const test = [1, 2, 3];
	const jsxNoMultilineJs = () => test.map((item) => <div key={item} />);
})();
