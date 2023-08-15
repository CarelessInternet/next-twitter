import Image from 'next/image';
import { Card, CardHeader } from '@nextui-org/card';
import { IconDiscountCheckFilled } from '@tabler/icons-react';
import type { PostData } from '@/utils';

export default function UserInformation({
	user,
	id
}: {
	user: PostData['author'];
	id: PostData['authorId'];
}) {
	return (
		<Card className="bg-zinc-400/5">
			<CardHeader>
				<div className="flex flex-row items-center gap-2">
					<div className="flex flex-col justify-center">
						<div className="flex flex-row gap-1 items-center">
							<h4 className="text-medium font-semibold text-default-700 inline-block align-middle leading-normal">
								{user.name}
							</h4>
							{user.verified && (
								<IconDiscountCheckFilled width={18} height={18} className="text-sky-600" />
							)}
						</div>
						<h5 className="text-xs text-stone-600 dark:text-stone-400">{user.email}</h5>
						<h5 className="text-xs text-slate-800 dark:text-slate-400">{id}</h5>
					</div>
					<Image
						src={user.image!}
						alt={user.name!}
						width={64}
						height={64}
						className="object-cover rounded-xl border"
					/>
				</div>
			</CardHeader>
		</Card>
	);
}
