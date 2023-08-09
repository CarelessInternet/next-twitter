'use client';

import NextLink from 'next/link';
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
	NavbarMenuToggle,
	VisuallyHidden,
	useSwitch
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import {
	IconBrandGithub,
	IconBrandVercel,
	IconLogin,
	IconLogout,
	IconMoon,
	IconSun
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useIsSSR } from '@react-aria/ssr';

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const isSSR = useIsSSR();

	const onChange = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
		isSelected: theme === 'light',
		'aria-label': `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
		onChange
	});

	return (
		<Component {...getBaseProps()}>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<div
				{...getWrapperProps()}
				className={slots.wrapper({
					class: [
						'w-8 h-8 mx-0 px-0',
						'flex items-center justify-center',
						'bg-transparent !text-default-700 hover:opacity-80',
						'group-data-[selected=true]:bg-transparent'
					]
				})}
			>
				{!isSelected || isSSR ? <IconSun /> : <IconMoon />}
			</div>
		</Component>
	);
}

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
						<IconBrandVercel width={48} height={48} />
						<div className="text-lg ml-2">
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
					<CustomLink href="/technologies" text="Technologies" />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeSwitch />
				</NavbarItem>
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
					<CustomLink href="/technologies" text="Technologies" />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<ProfileButton />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
