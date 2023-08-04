import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { IconHome } from '@tabler/icons-react';

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center h-[80vh]">
			<h1 className="mb-4 text-9xl font-bold tracking-tight inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				404
			</h1>
			<Button
				variant="shadow"
				color="primary"
				size="lg"
				startContent={<IconHome />}
				as={Link}
				href="/"
			>
				Homepage
			</Button>
		</main>
	);
}
