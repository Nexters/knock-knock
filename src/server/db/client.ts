// src/server/db/client.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// warn(prisma-client) There are already 10 instances of Prisma Client actively running. 이런 에러 방지
