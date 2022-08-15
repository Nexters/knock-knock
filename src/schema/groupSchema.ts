import z from 'zod'

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.number().optional(),
  isPublic: z.boolean().optional(),
  tags: z.string().optional(),
})

export const modifyGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  password: z.number().optional(),
  isPublic: z.boolean().optional(),
  tags: z.string().optional(),
})

export type ICreateGroup = z.TypeOf<typeof createGroupSchema>
export type IModifyGroup = z.TypeOf<typeof modifyGroupSchema>
