import { getProviders } from 'next-auth/react';
import { LoginProviders } from './loginProviders';

export default async function Login() {
	const providers = await getProviders();

	return <LoginProviders providers={providers!} />;
}
