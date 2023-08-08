import Replies from './Replies';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Post } from '@/components';
import { type LoadMoreAction, prisma, type ReplyData } from '@/utils';
import type { Metadata, ResolvingMetadata } from 'next';

interface Parameters {
	params: {
		id: string;
	};
}

export async function generateMetadata(
	{ params: { id } }: Parameters,
	parent: ResolvingMetadata
): Promise<Metadata> {
	if (Number.isInteger(Number(id))) {
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
			include: {
				author: { select: { name: true, image: true } },
				originalPost: { select: { content: true } }
			}
		});

		if (post) {
			const title = `${post.author.name} on Next Twitter`;
			const description = post.content ?? post.originalPost?.content!;

			return {
				title,
				description,
				authors: {
					name: post.author.name!
				},
				openGraph: {
					title,
					description,
					url: (await parent).metadataBase!,
					siteName: 'Next Twitter',
					images: [
						{
							url: post.author.image ?? ''
						}
					],
					locale: 'en_GB',
					type: 'website'
				}
			};
		} else {
			notFound();
		}
	} else {
		notFound();
	}
}

export const loadReplies: LoadMoreAction<'id', ReplyData[]> = async ({
	offset = 0,
	id: postId
}) => {
	'use server';

	if (!Number.isInteger(Number(postId)) || typeof postId !== 'number') {
		throw new Error('Id must be specified (as a number)');
	}

	const REPLY_SIZE = 10;
	const data = await prisma.reply.findMany({
		where: { postId },
		include: {
			user: { select: { name: true, image: true, verified: true, email: true } },
			likes: { select: { userId: true } }
		},
		orderBy: [{ id: 'desc' }],
		skip: offset * REPLY_SIZE,
		take: REPLY_SIZE
	});

	return { data, hasMoreData: data.length >= REPLY_SIZE };
};

export default async function SpecificPost({ params: { id } }: Parameters) {
	if (!Number.isInteger(Number(id))) {
		notFound();
	}

	const session = await auth();

	if (!session) {
		redirect('/auth/login');
	}

	const post = await prisma.post.findUnique({
		where: { id: Number(id) },
		include: {
			author: { select: { name: true, image: true, verified: true, email: true } },
			likes: { select: { userId: true } },
			reposts: { select: { authorId: true } },
			originalPost: {
				include: { author: { select: { name: true, image: true, verified: true, email: true } } }
			},
			_count: { select: { replies: true } }
		}
	});

	if (!post) {
		notFound();
	}

	const { data: initialReplies } = await loadReplies({ id: post.id });

	return (
		<main className="flex flex-col flex-wrap content-center items-center gap-4">
			<Post post={post} session={session} link={false} />
			<Replies
				key={new Date().getTime()}
				initialReplies={initialReplies}
				session={session}
				loadReplies={loadReplies}
				postId={post.id}
			/>
		</main>
	);
}
