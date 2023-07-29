'use server';

import { auth } from '@/auth';
import { type PostData, prisma } from '@/utils';

export async function likePost(post: PostData) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	const likeAuthor = post.likes.find((like) => like.userId === session.user.id);

	if (likeAuthor) {
		await prisma.like.delete({ where: { id: likeAuthor.id } });
	} else {
		const databaseLikeAuthor = await prisma.like.findFirst({
			where: { postId: post.id, userId: session.user.id }
		});

		if (databaseLikeAuthor) {
			await prisma.like.delete({ where: { id: databaseLikeAuthor.id } });
		} else {
			await prisma.like.create({
				data: {
					postId: post.id,
					userId: session.user.id
				}
			});
		}
	}
}
