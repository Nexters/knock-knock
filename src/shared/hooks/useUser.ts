import { useSession } from 'next-auth/react'
import { useUserContext } from 'src/context/UserContext'

export function useUser() {
  const { status } = useSession()
  const user = useUserContext()

  return {
    isAuthenticated: status === 'authenticated' && user?.id,
    isLoadingUser: status === 'loading',
    user,
  }
}
