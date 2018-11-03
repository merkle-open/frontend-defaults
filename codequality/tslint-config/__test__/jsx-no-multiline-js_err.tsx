(() => {
	const test = [1, 2, 3];
	const jsxNoMultilineJs = () => (
		<div>
			{test.map((item) => (
				<div key={item}>{item}</div>
			))}
		</div>
	);
})();
