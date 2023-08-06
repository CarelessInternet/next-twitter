import Link from 'next/link';
import PostActions from './PostActions';
import PostFooter from './PostFooter';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { IconDiscountCheckFilled, IconMessageShare } from '@tabler/icons-react';
import { likeList } from '@/actions';
import { type PostData, getRelativeTime } from '@/utils';
import type { Session } from 'next-auth';
import Image from 'next/image';

export function Post({
	post,
	session,
	link = true
}: {
	post: PostData;
	session: Session;
	link?: boolean;
}) {
	return (
		<Card className="bg-zinc-400/10">
			<CardHeader className="flex flex-col items-stretch">
				{post.originalPostId && (
					<div className="flex flex-row gap-1 items-center ml-5">
						<IconMessageShare width={16} height={16} />
						<h5 className="text-small text-stone-500 dark:text-stone-300">
							{post.author.name} reposted:
						</h5>
					</div>
				)}
				<div className="flex justify-between items-center">
					<div className="flex flex-row items-center gap-2">
						<Image
							src={post.originalPost?.author.image ?? post.author.image!}
							alt={post.originalPost?.author.name ?? post.author.name!}
							width={32}
							height={32}
							className="rounded-full"
						/>
						<div className="flex flex-col justify-center">
							<div className="flex flex-row gap-1 items-center">
								<h4 className="text-medium font-semibold text-default-700 inline-block align-middle leading-normal">
									{post.originalPost?.author.name ?? post.author.name}
								</h4>
								{(post.originalPost?.author.verified ?? post.author.verified) && (
									<IconDiscountCheckFilled width={18} height={18} className="text-sky-600" />
								)}
								<h5 className="text-small text-stone-600 dark:text-stone-400">{`· ${getRelativeTime(
									post.createdAt
								)}`}</h5>
							</div>
							<h5 className="text-xs text-stone-600 dark:text-stone-400">
								{post.originalPost?.author.email ?? post.author.email}
							</h5>
						</div>
					</div>
					<PostActions post={post} loadLikes={likeList} session={session} />
				</div>
			</CardHeader>
			<Divider />
			{link ? (
				<Link href={`/home/post/${post.id}`}>
					<CardBody className="text-small text-default-900 p-3 whitespace-pre-wrap w-80 sm:w-[28rem] md:w-[32rem] lg:w-[36rem]">
						{post.originalPost?.content ?? post.content}
					</CardBody>
				</Link>
			) : (
				<CardBody className="text-small text-default-900 p-3 whitespace-pre-wrap w-80 sm:w-[28rem] md:w-[32rem] lg:w-[36rem]">
					{post.originalPost?.content ?? post.content}
				</CardBody>
			)}
			<Divider />
			<PostFooter post={post} session={session} />
		</Card>
	);
}
