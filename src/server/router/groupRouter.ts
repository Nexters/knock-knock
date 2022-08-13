import * as trpc from '@trpc/server'
import z from 'zod'

import { createRouter } from './context'
import { defaultError } from '../shared/errors'

export const groupRouter = createRouter()
  .query('groups', {
    async resolve({ ctx }) {
      try {
        const groups = await ctx.prisma.group.findMany()
        return groups
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
  .query('single-group', {
    input: z.object({ groupId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        const group = await ctx.prisma.group.findUnique({
          where: {
            id: input.groupId,
          },
        })
        return group
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
