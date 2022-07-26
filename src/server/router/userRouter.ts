import * as trpc from '@trpc/server'
import { updateUserNameSchema } from '../../schema/userSchema'
import { createRouter } from './context'

export const userRouter = createRouter().mutation('add-name', {
  input: updateUserNameSchema,
  async resolve({ ctx, input }) {
    const { name, email } = input
    console.log(ctx.user, '@!')
    let user
    try {
      user = await ctx.prisma.user.update({
        where: {
          email,
        },
        data: {
          name,
        },
      })
      console.log('@@@', user)
    } catch (error) {
      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }
    }
  },
})
