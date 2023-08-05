'use server';

import { auth } from '@/auth';
import { prisma, type ReplyData } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function deleteReply({ id, postId }: Pick<ReplyData, 'id' | 'postId'>) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	if (!id) {
		throw new Error('Missing the reply ID');
	}

	const replyAuthor = await prisma.reply.findFirst({
		where: { userId: session.user.id, id }
	});

	if (replyAuthor) {
		await prisma.reply.delete({ where: { id } });

		revalidatePath(`/home/post/${postId}`);
	}
}
