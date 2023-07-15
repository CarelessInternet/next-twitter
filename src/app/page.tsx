import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import { IconExternalLink, IconHome, IconLogin } from '@tabler/icons-react';
import { auth } from '@/utils';

export default async function Homepage() {
	const session = await auth();

	return (
		<main className="flex flex-col items-center">
			<section className="h-[80vh] flex flex-col justify-center">
				<div className="inline-block text-center">
					<h1 className="text-4xl font-bold tracking-tight inline text-gray-100">Your </h1>
					<h1 className="text-4xl font-bold tracking-tight inline text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-500">
						ideal Twitter{' '}
					</h1>
					<h1 className="text-4xl font-bold tracking-tight inline text-gray-100">for the </h1>
					<h1 className="text-4xl font-bold tracking-tight inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">
						modern web
					</h1>
				</div>
				<Spacer y={4} />
				<div className="text-center">
					<p className="text-medium text-gray-400">
						Are you tired of Elon Musk messing up with Twitter? Well, you are in luck! Welcome to
						your new home!
					</p>
				</div>
				<Spacer y={4} />
				<div className="flex flex-row justify-center">
					{session ? (
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
					) : (
						<Button
							as={Link}
							href="/auth/login"
							color="warning"
							variant="ghost"
							className="text-medium transition ease-in-out duration-300 hover:scale-105"
							startContent={<IconLogin />}
						>
							Login
						</Button>
					)}
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
