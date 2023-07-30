'use client';

import { Post } from '@/components';
import { useEffect, useRef, useState } from 'react';
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
	const pageNumber = useRef(1);

	// On new post and revalidation, get the new post from initialPosts and merge
	useEffect(() => {
		setPosts((prev) => uniqueArray(initialPosts, prev));
	}, [initialPosts]);

	const loadMore = async () => {
		const { data, hasMoreData } = await loadPosts({ offset: pageNumber.current });

		pageNumber.current += 1;
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
