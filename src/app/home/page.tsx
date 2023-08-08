import Posts from './Posts';
import Create from './Create';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { type LoadMoreAction, type PostData, prisma } from '@/utils';

export const loadPosts: LoadMoreAction<'none', PostData[]> = async ({ offset = 0 }) => {
	'use server';

	const POST_SIZE = 10;
	const data = await prisma.post.findMany({
		include: {
			author: { select: { name: true, image: true, verified: true, email: true } },
			likes: { select: { userId: true } },
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

export default async function Home() {
	const session = await auth();

	if (!session) {
		redirect('/auth/login');
	}

	const { data: initialPosts } = await loadPosts({});

	return (
		<main className="flex flex-col flex-wrap content-center items-center gap-6">
			<Create />
			<Posts
				key={new Date().getTime()}
				initialPosts={initialPosts}
				session={session}
				loadPosts={loadPosts}
			/>
		</main>
	);
}
