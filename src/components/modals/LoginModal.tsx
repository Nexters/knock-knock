import { useCustomRouter, useUser } from 'src/shared/hooks'
import BackDrop from 'src/components/BackDrop'

export default function LoginModal({ fallbackUrl }: { fallbackUrl?: string }) {
  const { isAuthenticated } = useUser()
  const router = useCustomRouter()

  function handleCloseClick() {
    router.back(fallbackUrl)
  }

  if (isAuthenticated) return null

  return (
    <>
      <BackDrop classNames="z-20" />
      <div className="w-full h-screen md:max-w-sm fixed mx-auto z-30">
        <div className="w-[80%] absolute top-1/2 -translate-y-1/2 bg-base-100 pt-9 pb-6 px-6 rounded-xl left-1/2 -translate-x-1/2 ">
          <h3 className="font-bold text-base text-center">어떤 계정으로 로그인 할까요?</h3>
          <div className="flex-col mt-6">
            <button
              onClick={() => router.push({ pathname: '/auth/login', query: { redirect: router.asPath } })}
              className="block mx-auto btn w-full mt-2 bg-primary text-white"
            >
              SNS 계정으로 로그인
            </button>
            <button
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
