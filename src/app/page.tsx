import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import { IconExternalLink, IconHome } from '@tabler/icons-react';

export default async function Homepage() {
	return (
		<main className="flex flex-col items-center">
			<section className="h-[85vh] flex flex-col justify-center">
				<div className="inline-block text-center">
					<h1 className="text-4xl font-bold tracking-tight inline text-gray-800 dark:text-gray-100">
						Your{' '}
					</h1>
					<h1 className="text-4xl font-bold tracking-tight inline text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">
						ideal Twitter{' '}
					</h1>
					<h1 className="text-4xl font-bold tracking-tight inline text-gray-800 dark:text-gray-100">
						for the{' '}
					</h1>
					<h1 className="text-4xl font-bold tracking-tight inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">
						modern web
					</h1>
				</div>
				<Spacer y={4} />
				<div className="text-center">
					<p className="text-medium text-gray-600 dark:text-gray-400">
						Are you tired of Elon Musk messing up with Twitter? Well, you are in luck! Welcome to
						your new home!
					</p>
				</div>
				<Spacer y={4} />
				<div className="flex flex-row justify-center">
					<Button
						as={Link}
						href="/home"
						color="success"
						variant="ghost"
						className="text-medium transition ease-in-out duration-300 hover:scale-110"
						startContent={<IconHome />}
					>
						Home
					</Button>
					<Spacer x={4} />
					<Button
						as={Link}
						target="_blank"
						href="https://github.com/CarelessInternet/next-twitter"
						color="default"
						variant="bordered"
						startContent={<IconExternalLink />}
					>
						GitHub
					</Button>
				</div>
			</section>
		</main>
	);
}
