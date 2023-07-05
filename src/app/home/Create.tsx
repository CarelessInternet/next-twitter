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
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { createPost } from './actions';

export default function Create() {
	const { data: session } = useSession();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { pending } = useFormStatus();
	const [tweetContent, setTweetContent] = useState('');

	return (
		session?.user && (
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
				<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="lg">
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>Send a Tweet</ModalHeader>
								<form action={createPost}>
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
											isLoading={pending}
											startContent={<IconSend />}
											onPress={() => {
												if (!pending) {
													onClose();
													setTweetContent('');
												}
											}}
										>
											Post
										</Button>
									</ModalFooter>
								</form>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		)
	);
}
