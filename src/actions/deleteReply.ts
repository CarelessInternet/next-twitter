'use server';

import { auth } from '@/auth';
import { prisma, type ReplyData } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function deleteReply(reply: ReplyData) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	if (!reply.id) {
		throw new Error('Missing the reply ID');
	}

	const replyAuthor = await prisma.reply.findFirst({
		where: { userId: session.user.id, id: reply.id }
	});

	if (replyAuthor) {
		await prisma.replyLike.deleteMany({ where: { replyId: reply.id } });
		await prisma.reply.delete({ where: { id: reply.id } });

		revalidatePath(`/home/post/${reply.postId}`);
	}
}
