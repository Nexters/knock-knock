import { Profile } from '@prisma/client'

import { IEvent } from './Event'
import { IGroup } from './Group'

export interface IUser extends Profile {
  groups: IGroup[]
  events: IEvent[]
}
