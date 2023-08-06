'use client';

import { Button, CardFooter } from '@nextui-org/react';
import { experimental_useOptimistic as useOptimistic, useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { likeReply } from '@/actions';
import type { ReplyData } from '@/utils';
import type { Session } from 'next-auth';

export default function ReplyFooter({ reply, session }: { reply: ReplyData; session: Session }) {
	const [optimisticLikes, addOptimisticLike] = useOptimistic(
		{ likeCount: reply.likes.length },
		(state, newLikeCount: number) => ({ ...state, likeCount: newLikeCount })
	);
	const [hasUserLiked, setHasUserLiked] = useState(
		reply.likes.some((like) => like.userId === session.user.id)
	);

	return (
		<CardFooter className="flex justify-end">
			<Button
				size="sm"
				radius="full"
				color="danger"
				className="hover:bg-danger-500"
				aria-label="Like"
				startContent={hasUserLiked ? <IconHeartFilled /> : <IconHeart />}
				onPress={async () => {
					addOptimisticLike(optimisticLikes.likeCount + (!hasUserLiked ? 1 : -1));
					setHasUserLiked((bool) => !bool);

					await likeReply(reply);
				}}
			>
				{optimisticLikes.likeCount}
			</Button>
		</CardFooter>
	);
}
