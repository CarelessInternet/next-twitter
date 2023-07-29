'use client';

import { Post } from '@/components';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from '@/components';
import { uniqueArray, type LoadMoreAction, type PostData } from '@/utils';
import type { Session } from 'next-auth';

export default function Posts({
	initialPosts,
	loadPosts,
	session
}: {
	initialPosts: PostData[];
	loadPosts: LoadMoreAction<'none', PostData[]>;
	session: Session;
}) {
	const [posts, setPosts] = useState(initialPosts);
	const [hasMore, setHasMore] = useState(true);

	// On new post and revalidation, get the new post from initialPosts and merge
	useEffect(() => {
		setPosts((prev) => uniqueArray(initialPosts, prev));
	}, [initialPosts]);

	const loadMore = async (offset: number) => {
		const { data, hasMoreData } = await loadPosts({ offset });

		setHasMore(hasMoreData);
		setPosts((prev) => uniqueArray(prev, data));
	};

	return (
		<InfiniteScroll loadMoreAction={loadMore} hasMore={hasMore}>
			{posts.map((post) => (
				<Post key={post.id} post={post} session={session} />
			))}
		</InfiniteScroll>
	);
}
