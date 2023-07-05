import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/utils';

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	pages: {
		signIn: '/auth/login'
	},
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;

			return session;
		}
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
