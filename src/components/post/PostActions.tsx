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
import {
	IconDiscountCheckFilled,
	IconDots,
	IconMessageHeart,
	IconRefresh
} from '@tabler/icons-react';
import {
	getRelativeTime,
	uniqueArray,
	type LikeData,
	type LoadMoreAction,
	type PostData
} from '@/utils';
import { useRef, useState } from 'react';
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
	const [likeCount, setLikeCount] = useState(post.likes.length);
	const pageNumber = useRef(0);

	const loadMore = async () => {
		const { data, hasMoreData, count } = await loadLikes({
			offset: pageNumber.current,
			id: post.id
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
				<DropdownMenu aria-label="Post actions" variant="flat" color="warning">
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
				scrollBehavior="inside"
				backdrop="opaque"
				size="sm"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="pb-2 px-4">
								{likeCount} {likeCount !== 1 ? 'People' : 'Person'} Who Liked This Post
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
														<h5 className="text-small text-stone-600 dark:text-stone-400">{`· ${getRelativeTime(
															createdAt
														)}`}</h5>
													</div>
													<h5 className="text-xs text-stone-600 dark:text-stone-400">
														{user.email}
													</h5>
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
