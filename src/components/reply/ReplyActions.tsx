'use client';

import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure
} from '@nextui-org/react';
import {
	IconDiscountCheckFilled,
	IconDots,
	IconMessageHeart,
	IconRefresh,
	IconTrash
} from '@tabler/icons-react';
import {
	getRelativeTime,
	uniqueArray,
	type LoadMoreAction,
	type ReplyData,
	type ReplyLikeData
} from '@/utils';
import { deleteReply } from '@/actions';
import { startTransition, useRef, useState } from 'react';
import { InfiniteScroll } from '../';
import type { Session } from 'next-auth';

export default function ReplyActions({
	reply,
	loadLikes,
	session
}: {
	reply: ReplyData;
	loadLikes: LoadMoreAction<'id', ReplyLikeData[]>;
	session: Session;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [likes, setLikes] = useState<ReplyLikeData[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [likeCount, setLikeCount] = useState(reply.likes.length);
	const pageNumber = useRef(0);

	const loadMore = async () => {
		const { data, hasMoreData, count } = await loadLikes({
			offset: pageNumber.current,
			id: reply.id
		});

		pageNumber.current += 1;
		setLikeCount(count!);
		setHasMore(hasMoreData);
		setLikes((prev) => uniqueArray(data, prev));
	};

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<IconDots />
				</DropdownTrigger>
				<DropdownMenu
					aria-label="Reply actions"
					variant="light"
					color="warning"
					disabledKeys={session.user.id !== reply.userId ? ['delete'] : []}
				>
					<DropdownSection title="Actions" showDivider>
						<DropdownItem
							key="likes"
							description="See who liked the reply"
							startContent={<IconMessageHeart />}
							onPress={onOpen}
						>
							Likes
						</DropdownItem>
					</DropdownSection>
					<DropdownSection aria-label="Dangerous actions">
						<DropdownItem
							key="delete"
							description="Delete your reply"
							color="danger"
							startContent={<IconTrash />}
							onPress={() =>
								startTransition(() => {
									deleteReply(reply);
								})
							}
						>
							Delete
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				scrollBehavior="inside"
				backdrop="opaque"
				size="sm"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="pb-2 px-4">
								{likeCount} {likeCount !== 1 ? 'People' : 'Person'} Who Liked This Reply
							</ModalHeader>
							<ModalBody className="px-2 py-0">
								<ul>
									<InfiniteScroll loadMoreAction={loadMore} hasMore={hasMore} loaderMargin={false}>
										{likes.map(({ user, createdAt }) => (
											<li key={user.id} className="flex my-4 mx-2 gap-2">
												<Avatar src={user.image!} name={user.name!} alt={user.name!} size="md" />
												<div className="flex flex-col justify-center">
													<div className="flex flex-row gap-1 items-center">
														<h4 className="text-medium font-semibold">{user.name}</h4>
														{user.verified && (
															<IconDiscountCheckFilled
																width={18}
																height={18}
																className="text-sky-600"
															/>
														)}
														<h5 className="text-small text-stone-400">{`· ${getRelativeTime(
															createdAt
														)}`}</h5>
													</div>
													<h5 className="text-xs text-stone-400">{user.email}</h5>
												</div>
											</li>
										))}
									</InfiniteScroll>
								</ul>
							</ModalBody>
							<ModalFooter className="pt-4 justify-between">
								<Button
									color="secondary"
									variant="ghost"
									startContent={<IconRefresh />}
									onPress={() => {
										pageNumber.current = 0;

										setLikes([]);
										setHasMore(true);
									}}
								>
									Refresh
								</Button>
								<Button color="danger" variant="flat" onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
