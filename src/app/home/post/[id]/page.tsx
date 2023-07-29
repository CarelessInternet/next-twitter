import { redirect } from 'next/navigation';
import { prisma } from '@/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import { auth } from '@/auth';
import { Post } from '@/components';

interface Parameters {
	params: {
		id: string;
	};
}

export async function generateMetadata(
	{ params: { id } }: Parameters,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const post = await prisma.post.findFirst({
		where: { id: Number(id) },
		include: { author: true }
	});

	if (post) {
		const title = `${post.author.name} on Next Twitter`;
		const description = post.content;

		return {
			title,
			description,
			authors: {
				name: post.author.name ?? ''
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
		redirect('/home');
	}
}

export default async function SpecificPost({ params: { id } }: Parameters) {
	const session = await auth();
	const post = await prisma.post.findFirst({
		where: { id: Number(id) },
		include: {
			author: true,
			likes: true
		}
	});

	return (
		<main className="flex flex-col flex-wrap content-center items-center gap-6">
			<Post post={post!} session={session} link={false} />
		</main>
	);
}
