import * as trpc from '@trpc/server'
import z from 'zod'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { createRouter } from './context'
import { defaultError } from '../shared/errors'
import { createGroupSchema, modifyGroupSchema } from 'src/schema/groupSchema'

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
          include: {
            members: {
              include: {
                profile: true,
              },
            },
            profile: true,
            events: true,
          },
        })
        return group
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
  .mutation('create-group', {
    input: createGroupSchema,
    async resolve({ ctx, input }) {
      try {
        const event = await ctx.prisma.group.create({
          data: {
            profile: {
              connect: {
                id: ctx.user?.id,
              },
            },
            ...input,
          },
        })
        return event
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'Group already exists',
            })
          }
        }
        console.error(e)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
  .mutation('insert-host-group', {
    input: z.object({ groupId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        const event = await ctx.prisma.member.create({
          data: {
            profile: {
              connect: {
                id: ctx.user?.id,
              },
            },
            group: {
              connect: {
                id: input.groupId,
              },
            },
            isHost: true,
          },
        })
        return event
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'Group already exists',
            })
          }
        }
        console.error(e)
        throw new trpc.TRPCError(defaultError)
      }
    },
  })
  .mutation('modify-group', {
    input: modifyGroupSchema,
    async resolve({ ctx, input }) {
      await ctx.prisma.group.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      })
    },
  })