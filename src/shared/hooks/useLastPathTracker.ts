import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect, useSessionStorage } from 'react-use'

export function useLastPathTracker() {
  const [lastPaths, setLastPaths] = useSessionStorage<string[]>('last-paths', [])
  const { pathname } = useRouter()

  function storePath(path: string) {
    const lastPath = lastPaths.length ? lastPaths[lastPaths.length - 1] : null
    if (!lastPath) {
      setLastPaths([path])
      return
    }
    if (lastPath === path) return
    setLastPaths([...lastPaths, path])
  }

  useIsomorphicLayoutEffect(() => {
    storePath(pathname)
  }, [pathname])

  return {
    lastPaths,
    setLastPaths,
  }
}
