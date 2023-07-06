'use server';

import { auth, type PostData, prisma } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function createPost(data: FormData) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	const content = data.get('post') as string;

	if (!content || content.length > 500) {
		throw new Error('Tweet must be >1 and <=500 characters long');
	}

	await prisma.post.create({
		data: {
			authorId: session!.user!.id,
			content
		}
	});

	revalidatePath('/home');
}

export async function likePost(post: PostData) {
	const session = await auth();
	const likeAuthor = post.likes.find((like) => like.userId === session?.user.id);

	if (likeAuthor) {
		await prisma.like.delete({ where: { id: likeAuthor.id } });
	} else {
		await prisma.like.create({
			data: {
				postId: post.id,
				userId: session!.user.id
			}
		});
	}

	revalidatePath('/home');
}
