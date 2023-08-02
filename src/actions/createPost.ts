'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { type PostData, prisma } from '@/utils';

export async function createPost(content: PostData['content']) {
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
