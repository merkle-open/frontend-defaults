import deepMerge from 'deepmerge';

const merge = <
	T1,
	T2,
	T3 = {},
	T4 = {},
	T5 = {},
	T6 = {},
	T7 = {},
	T8 = {},
	T9 = {},
	T10 = {},
	T11 = {},
	T12 = {},
	T13 = {},
	T14 = {},
	T15 = {}
>(
	t1: T1,
	t2: T2,
	t3?: T3,
	t4?: T4,
	t5?: T5,
	t6?: T6,
	t7?: T7,
	t8?: T8,
	t9?: T9,
	t10?: T10,
	t11?: T11,
	t12?: T12,
	t13?: T13,
	t14?: T14,
	t15?: T15
): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10 & T11 & T12 & T13 & T14 & T15 => {
	let m = {};
	m = deepMerge(m, t1);
	m = deepMerge(m, t2);
	m = deepMerge(m, t3 || {});
	m = deepMerge(m, t4 || {});
	m = deepMerge(m, t5 || {});
	m = deepMerge(m, t6 || {});
	m = deepMerge(m, t7 || {});
	m = deepMerge(m, t8 || {});
	m = deepMerge(m, t9 || {});
	m = deepMerge(m, t10 || {});
	m = deepMerge(m, t11 || {});
	m = deepMerge(m, t12 || {});
	m = deepMerge(m, t13 || {});
	m = deepMerge(m, t14 || {});
	m = deepMerge(m, t15 || {});
	return m as any;
};

export default merge;
