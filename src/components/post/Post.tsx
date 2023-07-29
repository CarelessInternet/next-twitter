import Link from 'next/link';
import PostActions from './PostActions';
import PostFooter from './Footer';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { IconDiscountCheckFilled } from '@tabler/icons-react';
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
		<Card className="bg-zinc-400/10 mb-6">
			<CardHeader className="flex justify-between">
				<div className="flex flex-row items-center gap-2">
					<Image
						src={post.author.image!}
						alt={post.author.name!}
						width={32}
						height={32}
						className="rounded-full"
					/>
					<div className="flex flex-col justify-center">
						<div className="flex flex-row gap-1 items-center">
							<h4 className="text-medium font-semibold text-default-700 inline-block align-middle leading-normal">
								{post.author.name}
							</h4>
							{post.author.verified && (
								<IconDiscountCheckFilled width={18} height={18} className="text-sky-600" />
							)}
							<h5 className="text-small text-stone-400">{`· ${getRelativeTime(
								post.createdAt
							)}`}</h5>
						</div>
						<h5 className="text-xs text-stone-400">{post.author.email}</h5>
					</div>
				</div>
				<PostActions post={post} loadLikes={likeList} />
			</CardHeader>
			<Divider />
			{link ? (
				<Link href={`/home/post/${post.id}`}>
					<CardBody className="text-small text-default-700 p-3 whitespace-pre-wrap w-80 sm:w-[28rem] md:w-[32rem] lg:w-[36rem]">
						{post.content}
					</CardBody>
				</Link>
			) : (
				<CardBody className="text-small text-default-700 p-3 whitespace-pre-wrap w-80 sm:w-[28rem] md:w-[32rem] lg:w-[36rem]">
					{post.content}
				</CardBody>
			)}
			<Divider />
			<PostFooter post={post} session={session} />
		</Card>
	);
}
