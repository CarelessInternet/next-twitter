'use server';

import { auth } from '@/auth';
import { type PostData, prisma } from '@/utils';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

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
		await prisma.$transaction([
			prisma.post.deleteMany({ where: { originalPostId: id } }),
			prisma.post.delete({ where: { id } })
		]);

		const currentPath = headers().get('x-invoke-path');

		revalidatePath(currentPath === `/home/post/${id}` ? `/home/post/${id}` : '/home');
	}
}
