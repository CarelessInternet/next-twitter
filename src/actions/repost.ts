'use server';

import { auth } from '@/auth';
import { type PostData, prisma } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function repost(id: PostData['id']) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	if (!id) {
		throw new Error('Missing the post ID');
	}

	const hasRepostByUser = await prisma.post.findFirst({
		where: { originalPostId: id, authorId: session.user.id }
	});

	if (!hasRepostByUser) {
		await prisma.post.create({ data: { authorId: session.user.id, originalPostId: id } });

		revalidatePath('/home');
	}
}
