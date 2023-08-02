import Posts from './Posts';
import Create from './Create';
import { auth } from '@/auth';
import { type LoadMoreAction, type PostData, prisma } from '@/utils';

export const loadPosts: LoadMoreAction<'none', PostData[]> = async ({ offset = 0 }) => {
	'use server';

	const POST_SIZE = 10;
	const data = await prisma.post.findMany({
		include: { author: true, likes: true, replies: true },
		orderBy: [{ id: 'desc' }],
		skip: offset * POST_SIZE,
		take: POST_SIZE
	});

	return { data, hasMoreData: data.length >= POST_SIZE };
};

export default async function Home() {
	const session = await auth();
	const { data: initialPosts } = await loadPosts({});

	return (
		<main className="flex flex-col flex-wrap content-center items-center gap-6">
			<Create />
			<Posts initialPosts={initialPosts} session={session} loadPosts={loadPosts} />
		</main>
	);
}
