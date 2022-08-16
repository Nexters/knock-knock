// src/server/router/index.ts
import superjson from 'superjson'
import { createRouter } from './context'
import { userRouter } from './userRouter'
import { eventRouter } from './eventRouter'
import { groupRouter } from './groupRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('users.', userRouter)
  .merge('events.', eventRouter)
  .merge('groups.', groupRouter)

export type AppRouter = typeof appRouter
