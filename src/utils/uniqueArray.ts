interface Id {
	id: number;
}

export function uniqueArray<T>(firstPosts: Id[], secondPosts: Id[]) {
	const ids = new Set(firstPosts.map((post) => post.id));

	return [...firstPosts, ...secondPosts.filter((item) => !ids.has(item.id))].sort(
		(a, b) => b.id - a.id
	) as T;
}
