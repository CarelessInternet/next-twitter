'use server';

import { auth } from '@/auth';
import { type LikeData, type LoadMoreAction, prisma } from '@/utils';

export const likeList: LoadMoreAction<'id', LikeData[]> = async ({ offset = 0, id: postId }) => {
	if (typeof postId !== 'number') {
		throw new Error('Id must be specified (as a number)');
	}

	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	const LIKE_SIZE = 10;
	const [data, count] = await prisma.$transaction([
		prisma.like.findMany({
			where: { postId },
			include: { user: true },
			orderBy: { createdAt: 'desc' },
			skip: offset * LIKE_SIZE,
			take: LIKE_SIZE
		}),
		prisma.like.count({ where: { postId } })
	]);

	return { data, hasMoreData: data.length >= LIKE_SIZE, count };
};
