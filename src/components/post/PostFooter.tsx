'use client';

import {
	Button,
	CardFooter,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure
} from '@nextui-org/react';
import {
	IconBlockquote,
	IconHeart,
	IconHeartFilled,
	IconMessageCircle,
	IconMessagePlus
} from '@tabler/icons-react';
import { experimental_useOptimistic as useOptimistic, useState, useTransition } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { createReply, likePost } from '@/actions';
import type { PostData } from '@/utils';
import type { Session } from 'next-auth';

export default function PostFooter({ post, session }: { post: PostData; session: Session }) {
	// Like
	const [optimisticLikes, addOptimisticLike] = useOptimistic(
		{ likeCount: post.likes.length },
		(state, newLikeCount: number) => ({ ...state, likeCount: newLikeCount })
	);
	const [hasUserLiked, setHasUserLiked] = useState(
		Boolean(post.likes.find((like) => like.userId === session.user.id))
	);

	// Reply
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [replyContent, setReplyContent] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();

	return (
		<CardFooter className="flex justify-between">
			<>
				<Button
					size="sm"
					radius="full"
					color="success"
					className="hover:bg-success-500"
					aria-label="Reply"
					startContent={<IconMessageCircle />}
					onPress={onOpen}
				>
					{post.replies.length}
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement="center"
					backdrop="blur"
					size="lg"
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>Send a Reply</ModalHeader>
								<ModalBody>
									<Textarea
										name="reply"
										label="Reply Content"
										labelPlacement="outside"
										placeholder="Why did Elon Musk rename Twitter to X?"
										variant="bordered"
										radius="sm"
										minRows={5}
										minLength={1}
										maxLength={500}
										isRequired
										value={replyContent}
										onValueChange={setReplyContent}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										type="submit"
										color="primary"
										variant="ghost"
										className="font-small"
										isLoading={isPending}
										startContent={<IconMessagePlus />}
										onPress={() => {
											if (replyContent) {
												startTransition(() => {
													createReply({
														content: replyContent,
														postId: post.id
													});

													if (!isPending) {
														onClose();
														setReplyContent('');

														const linkToPost = `/home/post/${post.id}`;

														if (pathname !== linkToPost) {
															redirect(linkToPost);
														}
													}
												});
											}
										}}
									>
										Reply
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
			<Button
				isIconOnly
				size="sm"
				radius="full"
				color="primary"
				className="hover:bg-primary-500"
				aria-label="Repost"
			>
				<IconBlockquote />
			</Button>
			<Button
				size="sm"
				radius="full"
				color="danger"
				className="hover:bg-danger-500"
				aria-label="Like"
				startContent={hasUserLiked ? <IconHeartFilled /> : <IconHeart />}
				onPress={async () => {
					addOptimisticLike(optimisticLikes.likeCount + (!hasUserLiked ? 1 : -1));
					setHasUserLiked((bool) => !bool);

					await likePost(post);
				}}
			>
				{optimisticLikes.likeCount}
			</Button>
		</CardFooter>
	);
}
