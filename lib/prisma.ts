import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // 這樣可以在終端機看到執行了哪些 SQL 指令，方便除錯
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;