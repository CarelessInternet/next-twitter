'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { IconBrandGithub, IconLogin, IconLogout } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import Image from 'next/image';

export function Header() {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session, status } = useSession();

	function CustomLink({ href, text }: { href: string; text: string }) {
		return (
			<Link href={href} color={pathname === href ? 'success' : 'foreground'} as={NextLink}>
				{text}
			</Link>
		);
	}

	function ProfileButton() {
		if (status !== 'loading') {
			if (session) {
				return (
					<Dropdown backdrop="opaque">
						<DropdownTrigger>
							<Button color="primary" variant="flat">
								{session.user.name}
							</Button>
						</DropdownTrigger>
						<DropdownMenu color="primary" variant="flat">
							<DropdownItem
								key="login"
								startContent={<IconLogin />}
								onPress={() => router.push('/auth/login')}
							>
								Login
							</DropdownItem>
							<DropdownItem
								key="logout"
								color="danger"
								className="text-danger"
								startContent={<IconLogout />}
								onPress={() => signOut({ callbackUrl: '/' })}
							>
								Log out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				);
			} else {
				return (
					<Button
						href="/auth/login"
						color="primary"
						variant="bordered"
						startContent={<IconLogin />}
						as={NextLink}
					>
						Login
					</Button>
				);
			}
		} else {
			return (
				<Button color="primary" variant="bordered" isLoading>
					Loading User
				</Button>
			);
		}
	}

	return (
		<Navbar isBordered={true} className="mb-4" position="static">
			<NavbarContent>
				<NavbarItem>
					<NavbarBrand>
						<Image src="/vercel.png" width={64} height={64} alt="vercel" />
						<div className="text-lg">
							<CustomLink href="/" text="Next Twitter" />
						</div>
					</NavbarBrand>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="center" className="hidden md:flex">
				<NavbarItem>
					<CustomLink href="/home" text="Home" />
				</NavbarItem>
				<NavbarItem>
					<CustomLink href="/about" text="About" />
				</NavbarItem>
				<NavbarItem>
					<CustomLink href="/technology" text="Technology" />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="text-3xl">
					<Link
						isExternal
						href="https://github.com/CarelessInternet/next-twitter"
						aria-label="GitHub"
					>
						<IconBrandGithub className="text-default-700" />
					</Link>
				</NavbarItem>
				<NavbarMenuToggle aria-label="toggle navigation" className="md:hidden" />
				<NavbarItem className="hidden md:flex">
					<ProfileButton />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem>
					<CustomLink href="/home" text="Home" />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<CustomLink href="/about" text="About" />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<CustomLink href="/technology" text="Technology" />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<ProfileButton />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
