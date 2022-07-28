import z from 'zod'

export const createProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  oauthId: z.string().optional(),
  image: z.string().optional().nullable(),
  emailVerified: z.date().optional(),
  tags: z.string(),
  introduction: z.string().optional(),
})

export type ICreateProfile = z.TypeOf<typeof createProfileSchema>
