(() => {
	const test = [{ id: 1 }, { id: 2 }];
	const jsxNoMultilineJs = (
		<div>
			{test.map((item) => (
				<div key={item.id}>ID: {item.id}</div>
			))}
		</div>
	);
})();
