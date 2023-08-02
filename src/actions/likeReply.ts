'use server';

import { auth } from '@/auth';
import { prisma, type ReplyData } from '@/utils';

export async function likeReply(reply: ReplyData) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	const likeAuthor = reply.likes.find((like) => like.userId === session.user.id);

	if (likeAuthor) {
		await prisma.replyLike.delete({ where: { id: likeAuthor.id } });
	} else {
		const databaseLikeAuthor = await prisma.replyLike.findFirst({
			where: { replyId: reply.id, userId: session.user.id }
		});

		if (databaseLikeAuthor) {
			await prisma.replyLike.delete({ where: { id: databaseLikeAuthor.id } });
		} else {
			await prisma.replyLike.create({
				data: {
					replyId: reply.id,
					userId: session.user.id
				}
			});
		}
	}
}
