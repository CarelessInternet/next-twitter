import Image from 'next/image';
import PostFooter from './PostFooter';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { IconDiscountCheckFilled } from '@tabler/icons-react';
import { type PostData, getRelativeTime } from '@/utils';
import type { Session } from 'next-auth/types';

export default function Post({ post, session }: { post: PostData; session: Session }) {
	return (
		<Card className="bg-zinc-400/10">
			<CardHeader className="flex gap-2">
				<Image
					src={post.author.image!}
					alt={post.author.name!}
					height={32}
					width={32}
					className="rounded-full max-h-8"
				/>
				<div className="flex flex-col items-start justify-center">
					<div className="flex flex-row gap-1">
						<h4 className="text-medium font-semibold leading-none text-default-700">
							{post.author.name}
						</h4>
						{post.author.verified && (
							<IconDiscountCheckFilled width={18} height={18} className="text-sky-600" />
						)}
						<h5 className="text-small text-default-400">
							{`· ${getRelativeTime(post.createdAt)}`}
						</h5>
					</div>
					<h5 className="text-xs text-default-300">{post.author.email}</h5>
				</div>
			</CardHeader>
			<Divider />
			<CardBody className="text-small text-default-700 p-3 whitespace-pre-wrap">
				{post.content}
			</CardBody>
			<Divider />
			<PostFooter post={post} session={session} />
		</Card>
	);
}
