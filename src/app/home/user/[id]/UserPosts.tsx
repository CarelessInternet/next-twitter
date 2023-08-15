'use client';

import { useRef, useState } from 'react';
import { InfiniteScroll, Post } from '@/components';
import { type LoadMoreAction, uniqueArray, type PostData } from '@/utils';
import type { Session } from 'next-auth';

export default function UserPosts({
	initialPosts,
	loadPosts,
	session,
	userId: id
}: {
	initialPosts: PostData[];
	loadPosts: LoadMoreAction<'id', PostData[]>;
	session: Session;
	userId: PostData['authorId'];
}) {
	const [posts, setPosts] = useState(initialPosts);
	const [hasMore, setHasMore] = useState(true);
	const pageNumber = useRef(1);

	const loadMore = async () => {
		const { data, hasMoreData } = await loadPosts({ offset: pageNumber.current, id });

		pageNumber.current += 1;
		setHasMore(hasMoreData);
		setPosts((prev) => uniqueArray(data, prev));
	};

	return (
		<InfiniteScroll loadMoreAction={loadMore} hasMore={hasMore}>
			{posts.map((post) => (
				<div key={post.id} className="mb-6">
					<Post post={post} session={session} />
				</div>
			))}
		</InfiniteScroll>
	);
}
