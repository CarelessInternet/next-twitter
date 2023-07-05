import type { Prisma } from '@prisma/client';

export { prisma } from './prisma';
export { serverSession } from './serverSession';
export { getRelativeTime } from './getRelativeTime';

export type PostData = Prisma.PostGetPayload<{ include: { author: true; likes: true } }>;
