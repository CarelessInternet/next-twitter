import Image from 'next/image';
import { Link } from '@nextui-org/link';
import { Card, CardBody } from '@nextui-org/card';
import type { PropsWithChildren } from 'react';

function GridItem({
	children,
	src,
	title,
	href,
	invert = false
}: PropsWithChildren<{ src: string; title: string; href: string; invert?: boolean }>) {
	return (
		<div className="px-0 md:px-2 lg:px-8">
			<Card
				className="
					min-h-64 max-h-80 transition ease-in-out hover:-translate-y-4 hover:scale-105 dark:border-2 dark:border-zinc-800
					bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-200 via-pink-100 to-lime-50
					dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-zinc-950 dark:via-stone-950 dark:to-zinc-950
				"
			>
				<CardBody className="overflow-hidden">
					<div className="flex flex-col gap-5">
						<div className="flex flex-row gap-4 justify-center items-center">
							<Image
								src={src}
								width={96}
								height={96}
								alt={title}
								className={`!w-20 !h-20 md:!w-24 md:!h-24 ${invert && 'dark:invert'}`}
							/>
							<Link
								isExternal
								href={href}
								color="foreground"
								underline="hover"
								className="text-4xl"
							>
								{title}
							</Link>
						</div>
						<p className="text-justify text-sm md:text-base lg:text-lg">{children}</p>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

export default function Technologies() {
	return (
		<main className="h-[75vh] mt-16 w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-4 items-center">
			<GridItem src="/nextjs.svg" title="Next.js" href="https://nextjs.org" invert={true}>
				Next Twitter is built using the frontend (& backend) React framework Next.js v13 with the
				new App Router and Server Actions. Everything is built within Next.js, including the backend
				for fetching posts and what not.
			</GridItem>
			<GridItem src="/nextauth.png" title="NextAuth" href="https://authjs.dev">
				Regarding authentication, the easiest solution for Next Twitter is to use the popular
				NextAuth (now Auth.js) library for OAuth with Google, allowing for a smooth and seamless
				experience when logging in and posting away.
			</GridItem>
			<GridItem src="/prisma.png" title="Prisma" href="https://www.prisma.io" invert={true}>
				Prisma gives the power to create database tables and queries without having to touch SQL, as
				well as being able to run in serverless environments. In combination with{' '}
				<Link
					isExternal
					href="https://planetscale.com"
					color="foreground"
					underline="hover"
					className="text-sm md:text-base lg:text-lg"
				>
					Planetscale
				</Link>
				, these two powerful backend features made Next Twitter possible.
			</GridItem>
			<GridItem src="/nextui.png" title="NextUI" href="https://nextui.org">
				Finally, the component library used to make the frontend of Next Twitter is NextUI v2 with
				Tailwind. They have some beautiful components and transitions between dark and light theme
				to make your experience better!
			</GridItem>
		</main>
	);
}
