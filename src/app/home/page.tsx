import Posts from './(post)/Posts';
import Create from './Create';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { loadPosts } from './actions';

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
