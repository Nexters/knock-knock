import z from 'zod'

export const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  startingTimes: z.string(),
  timeSize: z.number(),
  isPublicMeet: z.boolean(),
  headCounts: z.number(),
  tags: z.string(),
})

export type ICreateEvent = z.TypeOf<typeof createEventSchema>
