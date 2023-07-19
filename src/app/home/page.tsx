import Posts from './(post)/Posts';
import Create from './Create';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { type LoadMoreAction, type PostData, prisma } from '@/utils';

export const loadPosts: LoadMoreAction<PostData[]> = async (offset: number = 0) => {
	'use server';

	const POST_SIZE = 10;
	const data = await prisma.post.findMany({
		include: { author: true, likes: true },
		orderBy: [{ id: 'desc' }],
		skip: offset * POST_SIZE,
		take: POST_SIZE
	});

	return { data, hasMoreData: data.length >= POST_SIZE };
};

export default async function Home() {
	const session = await auth();

	if (session) {
		const { data: initialPosts } = await loadPosts();

		return (
			<main className="flex flex-col flex-wrap content-center items-center gap-6">
				<Create />
				<div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
					<Posts initialPosts={initialPosts} session={session} loadPosts={loadPosts} />
				</div>
			</main>
		);
	} else {
		redirect('/auth/login');
	}
}
