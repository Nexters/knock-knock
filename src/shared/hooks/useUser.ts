import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useUserContext } from 'src/context/UserContext'

interface AnonymousUser {
  id: string
  name: string
}

export function useUser() {
  const { status } = useSession()
  const user = useUserContext()

  const [anonymousUser, setAnonymousUser] = useState<AnonymousUser>()

  return {
    isAuthenticated: status === 'authenticated' && user?.id,
    isLoadingUser: status === 'loading',
    isAnonymousUser: !user && anonymousUser,
    user: user || anonymousUser || null,
    setAnonymousUser,
  }
}
