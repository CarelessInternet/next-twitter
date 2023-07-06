'use client';

import { Button, CardFooter } from '@nextui-org/react';
import { IconBlockquote, IconHeart, IconHeartFilled, IconMessageCircle } from '@tabler/icons-react';
import { experimental_useOptimistic as useOptimistic, useState } from 'react';
import { useSession } from 'next-auth/react';
import { likePost } from '../actions';
import type { PostData } from '@/utils';

export default function PostFooter({ post }: { post: PostData }) {
	const { data: session } = useSession();
	const [optimisticLikes, addOptimisticLike] = useOptimistic(
		{ likeCount: post.likes.length },
		(state, newLikeCount: number) => ({ ...state, likeCount: newLikeCount })
	);

	const [hasUserLiked, setHasUserLiked] = useState(
		Boolean(post.likes.find((like) => like.userId === session?.user.id))
	);

	return (
		<CardFooter className="flex justify-between">
			<Button isIconOnly size="sm" radius="full" color="success" className="hover:bg-success-500">
				<IconMessageCircle />
			</Button>
			<Button isIconOnly size="sm" radius="full" color="primary" className="hover:bg-primary-500">
				<IconBlockquote />
			</Button>
			<Button
				size="sm"
				radius="full"
				color="danger"
				className="hover:bg-danger-500"
				startContent={hasUserLiked ? <IconHeartFilled /> : <IconHeart />}
				onPress={async () => {
					addOptimisticLike(
						!hasUserLiked ? optimisticLikes.likeCount + 1 : optimisticLikes.likeCount - 1
					);
					setHasUserLiked((bool) => !bool);

					await likePost(post);
				}}
			>
				{optimisticLikes.likeCount}
			</Button>
		</CardFooter>
	);
}
