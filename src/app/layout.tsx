import './globals.css';
import { Header } from '@/components';
import { Providers } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Twitter',
	description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
