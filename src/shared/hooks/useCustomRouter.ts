import { useRouter as useNextRouter } from 'next/router'

export function useCustomRouter() {
  const router = useNextRouter()
  function back(fallbackUrl: string = '/') {
    if (history.length <= 1) {
      router.replace(fallbackUrl)
    } else {
      router.back()
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
