import type { Prisma } from '@prisma/client';

export * from './prisma';
export * from './getRelativeTime';
export * from './auth';

export type PostData = Prisma.PostGetPayload<{ include: { author: true; likes: true } }>;
