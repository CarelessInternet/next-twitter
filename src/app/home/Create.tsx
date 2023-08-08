'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure
} from '@nextui-org/react';
import { IconPencilPlus, IconSend } from '@tabler/icons-react';
import { useState, useTransition } from 'react';
import { createPost } from '@/actions';

export default function Create() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [tweetContent, setTweetContent] = useState('');
	const [isPending, startTransition] = useTransition();

	return (
		<div>
			<Button
				color="success"
				variant="shadow"
				startContent={<IconPencilPlus />}
				className="transition ease-in-out duration-300 hover:scale-110"
				onPress={onOpen}
			>
				<p className="font-semibold">Tweet</p>
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
							<ModalHeader>Send a Tweet</ModalHeader>
							<ModalBody>
								<Textarea
									name="post"
									label="Tweet Content"
									labelPlacement="outside"
									placeholder="Elon Musk makes terrible decisions..."
									variant="bordered"
									radius="sm"
									minRows={5}
									minLength={1}
									maxLength={500}
									isRequired
									value={tweetContent}
									onValueChange={setTweetContent}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									type="submit"
									color="primary"
									variant="ghost"
									className="font-small"
									isLoading={isPending}
									startContent={<IconSend />}
									onPress={() => {
										if (tweetContent) {
											startTransition(() => {
												createPost(tweetContent);

												if (!isPending) {
													onClose();
													setTweetContent('');
												}
											});
										}
									}}
								>
									Post
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
