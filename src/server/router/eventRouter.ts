import * as trpc from '@trpc/server'
import { createProfileSchema } from '../../schema/userSchema'
import { createRouter } from './context'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { defaultError } from '../shared/errors'
import z from 'zod'

export const eventRouter = createRouter()
  .query('events', {
    async resolve({ ctx }) {
      try {
        const events = await ctx.prisma.event.findMany({})
        return events
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
  .query('single-event', {
    input: z.object({ eventId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        const event = await ctx.prisma.event.findUnique({
          where: {
            id: input.eventId,
          },
          include: {
            participates: true,
            profile: true,
          },
        })
        return event
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
  .mutation('create-event', {
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
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
