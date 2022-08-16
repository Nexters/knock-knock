import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { useUserContext } from 'src/context/UserContext'
import { anonymousUserState } from '../recoil/user/atoms'

export function useUser() {
  const { status } = useSession()
  const user = useUserContext()
  const [anonymousUser, setAnonymousUser] = useRecoilState(anonymousUserState)

  return {
    isAuthenticated: !!user,
    isLoadingUser: status === 'loading',
    isAnonymousUser: (!user && anonymousUser) || false,
    user: user || anonymousUser || null,
    setAnonymousUser,
  }
}
