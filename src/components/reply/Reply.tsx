import Image from 'next/image';
import ReplyFooter from './ReplyFooter';
import ReplyActions from './ReplyActions';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { IconDiscountCheckFilled } from '@tabler/icons-react';
import { getRelativeTime, type ReplyData } from '@/utils';
import { replyLikeList } from '@/actions';
import type { Session } from 'next-auth';

export function Reply({ reply, session }: { reply: ReplyData; session: Session }) {
	return (
		<Card className="bg-zinc-400/10 mb-6">
			<CardHeader className="flex justify-between">
				<div className="flex flex-row items-center gap-2">
					<Image
						src={reply.user.image!}
						alt={reply.user.name!}
						width={32}
						height={32}
						className="rounded-full"
					/>
					<div className="flex flex-col justify-center">
						<div className="flex flex-row gap-1 items-center">
							<h4 className="text-medium font-semibold text-default-700 inline-block align-middle leading-normal">
								{reply.user.name}
							</h4>
							{reply.user.verified && (
								<IconDiscountCheckFilled width={18} height={18} className="text-sky-600" />
							)}
							<h5 className="text-small text-stone-600 dark:text-stone-400">{`· ${getRelativeTime(
								reply.createdAt
							)}`}</h5>
						</div>
						<h5 className="text-xs text-stone-600 dark:text-stone-400">{reply.user.email}</h5>
					</div>
				</div>
				<ReplyActions reply={reply} loadLikes={replyLikeList} session={session} />
			</CardHeader>
			<Divider />
			<CardBody className="text-small text-default-900 p-3 whitespace-pre-wrap w-64 sm:w-[24rem] md:w-[28rem] lg:w-[32rem]">
				{reply.content}
			</CardBody>
			<Divider />
			<ReplyFooter reply={reply} session={session} />
		</Card>
	);
}
