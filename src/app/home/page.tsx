import Create from './Create';
import Post from './(post)/Post';
import { auth, prisma } from '@/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await auth();

	if (session) {
		const posts = await prisma.post.findMany({
			include: { author: true, likes: true },
			orderBy: [{ createdAt: 'desc' }]
		});

		return (
			<main className="flex flex-col flex-wrap content-center items-center gap-6">
				<Create />
				<div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
					{posts.map((post) => (
						<div key={post.id} className="mb-6">
							<Post post={post} session={session} />
						</div>
					))}
				</div>
			</main>
		);
	} else {
		redirect('/auth/login');
	}
}
