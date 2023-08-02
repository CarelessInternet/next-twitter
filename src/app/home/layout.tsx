import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import type { PropsWithChildren } from 'react';

export default async function RootHomeLayout({ children }: PropsWithChildren) {
	const session = await auth();

	if (session) {
		return <>{children}</>;
	} else {
		redirect('/auth/login');
	}
}
