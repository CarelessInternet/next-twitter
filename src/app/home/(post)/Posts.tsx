'use client';

import Post from './Post';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from '@/components';
import type { LoadMoreAction, PostData } from '@/utils';
import type { Session } from 'next-auth';

function uniquePosts(firstPosts: PostData[], secondPosts: PostData[]) {
	const ids = new Set(firstPosts.map((post) => post.id));

	return [...firstPosts, ...secondPosts.filter((item) => !ids.has(item.id))].sort(
		(a, b) => b.id - a.id
	);
}

export default function Posts({
	initialPosts,
	loadPosts,
	session
}: {
	initialPosts: PostData[];
	loadPosts: LoadMoreAction<PostData[]>;
	session: Session;
}) {
	const [posts, setPosts] = useState(initialPosts);
	const [hasMore, setHasMore] = useState(true);

	// On new post and revalidation, get the new post from initialPosts and merge
	useEffect(() => {
		setPosts((prev) => uniquePosts(initialPosts, prev));
	}, [initialPosts]);

	const loadMore = async (offset: number) => {
		const { data, hasMoreData } = await loadPosts(offset);

		setHasMore(hasMoreData);
		setPosts((prev) => uniquePosts(prev, data));
	};

	return (
		<InfiniteScroll loadMoreAction={loadMore} hasMore={hasMore}>
			{posts.map((post) => (
				<Post key={post.id} post={post} session={session} />
			))}
		</InfiniteScroll>
	);
}
