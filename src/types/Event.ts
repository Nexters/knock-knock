import { Event, Participation } from '@prisma/client'

export interface IEvent extends Event {
  participates: Participation[]
}
