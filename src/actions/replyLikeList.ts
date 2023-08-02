'use server';

import { auth } from '@/auth';
import { type ReplyLikeData, type LoadMoreAction, prisma } from '@/utils';

export const replyLikeList: LoadMoreAction<'id', ReplyLikeData[]> = async ({
	offset = 0,
	id: replyId
}) => {
	if (typeof replyId !== 'number') {
		throw new Error('Id must be specified (as a number)');
	}

	const session = await auth();

	if (!session) {
		throw new Error('Not logged in');
	}

	const LIKE_SIZE = 10;
	const [data, count] = await prisma.$transaction([
		prisma.replyLike.findMany({
			where: { replyId },
			include: { user: true },
			orderBy: { createdAt: 'desc' },
			skip: offset * LIKE_SIZE,
			take: LIKE_SIZE
		}),
		prisma.replyLike.count({ where: { replyId } })
	]);

	return { data, hasMoreData: data.length >= LIKE_SIZE, count };
};
