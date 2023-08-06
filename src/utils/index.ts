import type { Prisma } from '@prisma/client';

export * from './prisma';
export * from './getRelativeTime';
export * from './uniqueArray';
export * from './LoadMore';

export type PostData = Prisma.PostGetPayload<{
	include: {
		author: true;
		likes: true;
		reposts: true;
		originalPost: { include: { author: true } };
		_count: { select: { replies: true } };
	};
}>;

export type LikeData = Prisma.LikeGetPayload<{
	include: { user: true };
}>;

export type ReplyData = Prisma.ReplyGetPayload<{
	include: { user: true; likes: true };
}>;

export type ReplyLikeData = Prisma.ReplyLikeGetPayload<{
	include: { user: true };
}>;
