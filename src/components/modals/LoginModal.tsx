import { useCustomRouter, useUser } from 'src/shared/hooks'
import BackDrop from 'src/components/BackDrop'
import { useRecoilValue } from 'recoil'
import { anonymousUserState } from 'src/shared/recoil/user/atoms'
import { getSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { trpc } from 'src/utils/trpc'

export default function LoginModal({ fallbackUrl, redirectUrl }: { fallbackUrl?: string; redirectUrl: string }) {
  const { isAuthenticated } = useUser()
  const router = useCustomRouter()
  const anonymous = useRecoilValue(anonymousUserState)
  const { data: me } = trpc.useQuery(['users.me'])
  function handleCloseClick() {
    router.back(fallbackUrl)
  }

  if (me?.id) router.replace(redirectUrl ?? (router.query.redirect as string) ?? '/')
  if (isAuthenticated || anonymous?.name) return null
  useEffect(() => {
    async function checkIsNewUser() {
      const session = await getSession()
      if (!me && session?.id) {
        router.replace({ pathname: '/auth/new-user', query: { redirect: redirectUrl } })
        return
      }
      return session
    }
    checkIsNewUser()
  }, [])

  return (
    <>
      <BackDrop classNames="z-50" />
      <div className="w-full h-screen md:max-w-sm fixed mx-auto z-50">
        <div className="w-[80%] absolute top-1/2 -translate-y-1/2 bg-base-100 pt-9 pb-6 px-6 rounded-xl left-1/2 -translate-x-1/2 ">
          <h3 className="font-bold text-base text-center">어떤 계정으로 로그인 할까요?</h3>
          <div className="flex-col mt-6">
            <button onClick={() => signIn('kakao')} className="btn w-full mt-2 bg-kakao text-bgColor hover:bg-kakao">
              <img src="/assets/svg/kakao.svg" alt="kakao" className="ml-3 mr-1 bg-kakao" />
              카카오로 로그인
            </button>
            <button onClick={() => signIn('google')} className="btn w-full mt-2 text-bgColor bg-white">
              <img src="/assets/svg/google.svg" alt="google" className="ml-3 mr-2" />
              구글로 로그인
            </button>
            <button
              disabled
              onClick={() =>
                router.push({ pathname: '/auth/login/anonymous', query: { redirect: router.query.asPath } })
              }
              className="block mx-auto btn w-full mt-2 bg-neutral hover:bg-opacity-30 text-white"
            >
              비회원 로그인
            </button>
          </div>
          <div className="absolute left-1/2 bottom-[-3.25rem] -translate-x-1/2">
            <button
              className="w-[2.5rem] h-[2.5rem] bg-[#46474C] rounded-full cursor-pointer"
              onClick={handleCloseClick}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
