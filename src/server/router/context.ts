// src/server/router/context.ts
import * as trpc from '@trpc/server'
import { prisma } from '../db/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  return { req, res, prisma, session: session?.user?.email ? session : null }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export function createRouter() {
  return trpc.router<Context>()
}
