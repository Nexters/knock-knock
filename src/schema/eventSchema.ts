import z from 'zod'

export const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  startingTimes: z.string(),
  timeSize: z.number(),
  status: z.string().optional(),
  headCounts: z.number().optional(),
  isUnlimitedHeadCounts: z.boolean().optional(),
  tags: z.string().optional(),
  groupId: z.string().optional(),
})

export type CreateEventInputSchema = z.TypeOf<typeof createEventSchema>

export const editEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  startingTimes: z.string(),
  timeSize: z.number(),
  status: z.string().optional(),
  headCounts: z.number().optional(),
  isUnlimitedHeadCounts: z.boolean().optional(),
  tags: z.string().optional(),
  groupId: z.string().optional(),
})

export type IEditEvent = z.TypeOf<typeof editEventSchema>
