(() => {
	const jsxNoLambda = () => <div>{() => <div />}</div>;
})();

(() => {
	const jsxNoLambda = () => <input onEnter={(event) => event.preventDefault()} />;
})();
