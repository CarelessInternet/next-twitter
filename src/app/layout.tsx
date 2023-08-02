import './globals.css';
import { Header } from '@/components';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Twitter',
	description: 'The new Twitter, for the next generation.',
	colorScheme: 'dark',
	themeColor: {
		media: '(prefers-color-scheme: dark)',
		color: '#000000'
	},
	metadataBase: new URL(
		process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: `http://localhost:${process.env.PORT || 3000}`
	)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body>
				<Providers>
					<Header />
					{children}
					<Analytics />
				</Providers>
			</body>
		</html>
	);
}
