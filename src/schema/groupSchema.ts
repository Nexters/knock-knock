import z from 'zod'

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.number().optional(),
  isPublic: z.boolean().optional(),
  tags: z.string().optional(),
})

export type ICreateGroup = z.TypeOf<typeof createGroupSchema>
