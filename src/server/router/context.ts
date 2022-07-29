// src/server/router/context.ts
import * as trpc from '@trpc/server'
import { prisma } from '../db/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

async function getUser(session: Session | null) {
  if (!prisma || !session?.user?.email) return null
  return prisma.profile.findFirst({ where: { email: session.user.email } })
}

export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  const user = await getUser(session)
  return { req, res, prisma, session, user }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export function createRouter() {
  return trpc.router<Context>()
}
