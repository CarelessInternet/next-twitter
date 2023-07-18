import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (typeof window === 'undefined') {
	prisma = global.prisma || new PrismaClient();

	if (process.env.NODE_ENV === 'development') global.prisma = prisma;
}

export { prisma };
