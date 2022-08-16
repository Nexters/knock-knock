import { atom } from 'recoil'
import { AnonymousUser } from './types'

export const anonymousUserState = atom<AnonymousUser>({
  key: 'anonymousUser',
  default: undefined,
})
