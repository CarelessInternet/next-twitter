import type { Prisma } from '@prisma/client';

export * from './prisma';
export * from './getRelativeTime';

export type PostData = Prisma.PostGetPayload<{ include: { author: true; likes: true } }>;

export type LoadMoreAction<T extends Object[] = Object[]> = (offset?: number) => Promise<{
	data: T;
	hasMoreData: boolean;
}>;
