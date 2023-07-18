'use server';

import { revalidatePath } from 'next/cache';
import { type PostData, prisma, type LoadMoreAction } from '@/utils';
import { auth } from '@/auth';

export const loadPosts: LoadMoreAction<PostData[]> = async (offset: number = 0) => {
	const POST_SIZE = 10;

	const data = await prisma.post.findMany({
		include: { author: true, likes: true },
		orderBy: [{ id: 'desc' }],
		skip: offset * POST_SIZE,
		take: POST_SIZE
	});

	return { data, hasMoreData: data.length >= POST_SIZE };
};

export async function createPost(content?: PostData['content']) {
	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	if (!content || content.length > 500) {
		throw new Error('Tweet must be >1 and <=500 characters long');
	}

	await prisma.post.create({
		data: {
			authorId: session.user.id,
			content
		}
	});

	revalidatePath('/home');
}

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
