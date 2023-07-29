'use client';

import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure
} from '@nextui-org/react';
import { IconDiscountCheckFilled, IconDots, IconMessageHeart } from '@tabler/icons-react';
import {
	getRelativeTime,
	uniqueArray,
	type LikeData,
	type LoadMoreAction,
	type PostData
} from '@/utils';
import { useState } from 'react';
import { InfiniteScroll } from '../';

export default function PostActions({
	post,
	loadLikes
}: {
	post: PostData;
	loadLikes: LoadMoreAction<'id', LikeData[]>;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [likes, setLikes] = useState<LikeData[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const loadMore = async (offset: number) => {
		const { data, hasMoreData } = await loadLikes({ offset, id: post.id });

		setHasMore(hasMoreData);
		setLikes((prev) => uniqueArray(prev, data));
	};

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<IconDots />
				</DropdownTrigger>
				<DropdownMenu aria-label="Post actions" variant="light" color="warning">
					<DropdownItem
						key="likes"
						description="See who liked the post"
						startContent={<IconMessageHeart />}
						onPress={onOpen}
					>
						Likes
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				scrollBehavior="outside"
				backdrop="opaque"
				size="xs"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="pb-2 px-4">
								{likes.length} {likes.length !== 1 ? 'People' : 'Person'} Who Liked This Post
							</ModalHeader>
							<ModalBody className="px-2 py-0">
								<ul>
									<InfiniteScroll
										loadMoreAction={loadMore}
										hasMore={hasMore}
										startingPage={0}
										loaderMargin={false}
									>
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
							<ModalFooter className="pt-2">
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
