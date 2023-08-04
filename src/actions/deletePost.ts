'use server';

import { auth } from '@/auth';
import { type PostData, prisma } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function deletePost(id: PostData['id']) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	if (!id) {
		throw new Error('Missing the post ID');
	}

	const postAuthor = await prisma.post.findFirst({
		where: { authorId: session.user.id, id }
	});

	if (postAuthor) {
		await prisma.replyLike.deleteMany({ where: { reply: { postId: id } } });
		await prisma.reply.deleteMany({ where: { postId: id } });
		await prisma.like.deleteMany({ where: { postId: id } });
		await prisma.post.delete({ where: { id } });

		revalidatePath(`/home/post/${id}`);
	}
}
