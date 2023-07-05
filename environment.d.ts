import type { DefaultSession } from 'next-auth';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
		}
	}
}

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}

export {};
