// Auth is in a separate file from "utils" because Next-Auth in that folder has
// server side code and any client side code that imports from "utils" will fail

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/utils';

export const {
	handlers: { GET, POST },
	auth,
	CSRF_experimental
} = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	adapter: PrismaAdapter(prisma),
	pages: { signIn: '/auth/login' },
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;

			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET
});
