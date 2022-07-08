// src/server/router/index.ts
import superjson from 'superjson'
import { createRouter } from './context'
import { postRouter } from './postRouter'
import { userRouter } from './userRouter'

export const appRouter = createRouter().transformer(superjson).merge('users.', userRouter).merge('posts.', postRouter)

// export type definition of API
export type AppRouter = typeof appRouter
