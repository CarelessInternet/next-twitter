import type { Prisma } from '@prisma/client';

export * from './prisma';
export * from './getRelativeTime';
export * from './uniqueArray';
export * from './LoadMore';

export type PostData = Prisma.PostGetPayload<{
	include: { author: true; likes: true };
}>;

export type LikeData = Prisma.LikeGetPayload<{
	include: { user: true };
}>;
