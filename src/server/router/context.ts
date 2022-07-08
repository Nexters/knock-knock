// src/server/router/context.ts
import * as trpc from '@trpc/server'
import { prisma } from '../db/client'
import superjson from 'superjson'
import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwt } from '../../utils/jwt'

interface CtxUser {
  id: string
  email: string
  name: string
  iat: string
  exp: number
}

function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      return verified
    } catch (e) {
      return null
    }
  }

  return null
}

export function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const user = getUserFromRequest(req)

  return { req, res, prisma, user }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export function createRouter() {
  return trpc.router<Context>().transformer(superjson)
}
