'use client';

import { Reply } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { InfiniteScroll } from '@/components';
import { uniqueArray, type LoadMoreAction, type ReplyData, type PostData } from '@/utils';
import type { Session } from 'next-auth';

export default function Replies({
	initialReplies,
	loadReplies,
	session,
	postId: id
}: {
	initialReplies: ReplyData[];
	loadReplies: LoadMoreAction<'id', ReplyData[]>;
	session: Session;
	postId: PostData['id'];
}) {
	const [replies, setReplies] = useState(initialReplies);
	const [hasMore, setHasMore] = useState(true);
	const pageNumber = useRef(1);

	const loadMore = async () => {
		const { data, hasMoreData } = await loadReplies({ offset: pageNumber.current, id });

		pageNumber.current += 1;
		setHasMore(hasMoreData);
		setReplies((prev) => uniqueArray(data, prev));
	};

	return (
		<InfiniteScroll loadMoreAction={loadMore} hasMore={hasMore}>
			{replies.map((reply) => (
				<div key={reply.id} className="mb-6">
					<Reply reply={reply} session={session} />
				</div>
			))}
		</InfiniteScroll>
	);
}
