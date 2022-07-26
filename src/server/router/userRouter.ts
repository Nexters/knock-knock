import * as trpc from '@trpc/server'
import { createProfileSchema } from '../../schema/userSchema'
import { createRouter } from './context'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export const userRouter = createRouter()
  .query('getSession', {
    resolve({ ctx }) {
      return ctx.session
    },
  })
  .query('me', {
    resolve({ ctx }) {
      const session = ctx.session
      if (!session) throw new trpc.TRPCError({ code: 'UNAUTHORIZED', message: 'Session is null' })
      return ctx.user
    },
  })
  .mutation('create-profile', {
    input: createProfileSchema,
    async resolve({ ctx, input }) {
      try {
        const profile = await ctx.prisma.profile.create({
          data: input,
        })
        return profile
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'Profile already exists',
            })
          }
        }
        console.error(e)
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        })
      }
    },
  })
