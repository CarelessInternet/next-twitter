'use client';

import { Button } from '@nextui-org/react';
import { signIn, type getProviders } from 'next-auth/react';

type Providers = NonNullable<Awaited<ReturnType<typeof getProviders>>>;

export function LoginProviders({ providers }: { providers: Providers }) {
	return (
		<>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<Button
						color="danger"
						variant="ghost"
						onPress={() => signIn(provider.id, { callbackUrl: '/home' })}
					>
						Sign in with {provider.name}
					</Button>
				</div>
			))}
		</>
	);
}
