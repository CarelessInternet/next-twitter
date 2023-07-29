import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function RootHomeLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	if (session) {
		return <>{children}</>;
	} else {
		redirect('/auth/login');
	}
}
