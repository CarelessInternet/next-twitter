import UserInformation from './UserInformation';
import UserPosts from './UserPosts';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { type LoadMoreAction, prisma, type PostData } from '@/utils';
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
	const user = await prisma.user.findUnique({
		where: { id },
		select: { name: true, image: true, verified: true, email: true }
	});

	if (!user) {
		notFound();
	}

	const title = `${user.name} on Next Twitter`;
	const description = title;

	return {
		title,
		description,
		authors: {
			name: user.name!
		},
		openGraph: {
			title,
			description,
			url: (await parent).metadataBase!,
			siteName: 'Next Twitter',
			images: [
				{
					url: user.image ?? ''
				}
			],
			locale: 'en_GB',
			type: 'website'
		}
	};
}

export const loadUserPosts: LoadMoreAction<'id', PostData[]> = async ({ offset = 0, id }) => {
	'use server';

	if (typeof id !== 'string') {
		throw new Error('Id must be specified (as a number)');
	}

	const POST_SIZE = 10;
	const data = await prisma.post.findMany({
		where: { authorId: id },
		include: {
			author: { select: { name: true, image: true, verified: true, email: true } },
			likes: { select: { id: true, userId: true } },
			reposts: { select: { authorId: true } },
			originalPost: {
				include: { author: { select: { name: true, image: true, verified: true, email: true } } }
			},
			_count: { select: { replies: true } }
		},
		orderBy: [{ id: 'desc' }],
		skip: offset * POST_SIZE,
		take: POST_SIZE
	});

	return { data, hasMoreData: data.length >= POST_SIZE };
};

export default async function User({ params: { id } }: Parameters) {
	const session = await auth();

	if (!session) {
		redirect('/auth/login');
	}

	const user = await prisma.user.findUnique({
		where: { id },
		select: { name: true, image: true, verified: true, email: true }
	});

	if (!user) {
		notFound();
	}

	const { data: initialPosts } = await loadUserPosts({ id });

	return (
		<main className="flex flex-col flex-wrap content-center items-center gap-4">
			<UserInformation user={user} id={id} />
			<UserPosts
				key={new Date().getTime()}
				initialPosts={initialPosts}
				session={session}
				loadPosts={loadUserPosts}
				userId={id}
			/>
		</main>
	);
}
