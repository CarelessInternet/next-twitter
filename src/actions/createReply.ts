'use server';

import { auth } from '@/auth';
import { prisma, type ReplyData } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function createReply({ content, postId }: Pick<ReplyData, 'content' | 'postId'>) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	if (!content || content.length > 500) {
		throw new Error('Reply must be >1 and <=500 characters long');
	}

	if (!postId) {
		throw new Error('Missing the post ID');
	}

	await prisma.reply.create({ data: { content, postId, userId: session.user.id } });

	revalidatePath(`/home/post/${postId}`);
}
