// src/server/router/index.ts
import superjson from 'superjson'
import { createRouter } from './context'
import { userRouter } from './userRouter'

export const appRouter = createRouter().transformer(superjson).merge('users.', userRouter)

export type AppRouter = typeof appRouter
