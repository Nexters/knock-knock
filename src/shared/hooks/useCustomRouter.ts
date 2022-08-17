import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect } from 'react-use'
import { useLastPathTracker } from './useLastPathTracker'

function isAuthPath(path: string) {
  if (path.startsWith('/auth') || path.startsWith('/api/auth')) return true
  return false
}

export function useCustomRouter() {
  const router = useRouter()
  const { lastPaths, setLastPaths } = useLastPathTracker()

  function back(fallbackUrl: string = '/') {
    if (history.length <= 1) {
      router.replace(fallbackUrl)
      return
    }

    const paths = [...lastPaths]
    while (true) {
      const lastPath = paths.pop()
      if (!lastPath) {
        router.replace(fallbackUrl)
        return
      }
      if (lastPath !== router.pathname && !isAuthPath(lastPath)) {
        setLastPaths(paths)
        router.replace(lastPath)
        return
      }
    }
  }

  function removeHash() {
    router.replace(router.asPath.split('#')[0] as string)
  }

  return {
    ...router,
    back,
    removeHash,
  }
}
