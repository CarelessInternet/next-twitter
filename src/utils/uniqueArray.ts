interface Id {
	id: number;
}

export function uniqueArray<T>(incomingArray: Id[], previousArray: Id[]) {
	const ids = new Set(incomingArray.map((array) => array.id));

	return [...incomingArray, ...previousArray.filter((item) => !ids.has(item.id))].sort(
		(a, b) => b.id - a.id
	) as T;
}
