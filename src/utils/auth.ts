import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '.';

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
