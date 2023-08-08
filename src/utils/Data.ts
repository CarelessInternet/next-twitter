import type { Prisma } from '@prisma/client';

type Satisfies<U, T extends U> = T;

type UserData = {
	select: Satisfies<Prisma.UserSelect, { name: true; image: true; verified: true; email: true }>;
};
type UserDataWithId = { select: UserData['select'] & { id: true } };

export type PostData = Prisma.PostGetPayload<{
	include: {
		author: UserData;
		likes: {
			select: {
				id: true;
				userId: true;
			};
		};
		reposts: { select: { authorId: true } };
		originalPost: { include: { author: UserData } };
		_count: { select: { replies: true } };
	};
}>;

export type LikeData = Prisma.LikeGetPayload<{
	include: { user: UserDataWithId };
}>;

export type ReplyData = Prisma.ReplyGetPayload<{
	include: { user: UserData; likes: { select: { id: true; userId: true } } };
}>;

export type ReplyLikeData = Prisma.ReplyLikeGetPayload<{
	include: { user: UserDataWithId };
}>;
