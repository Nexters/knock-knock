import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { CtxOrReq } from 'next-auth/client/_utils'

function LoginPage({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col items-center justify-center py-5 pt-9 px-5 relative h-screen bg-bgColor">
      <img src="assets/svg/logo.svg" alt="logo" className="mb-10 w-[220px]" />
      {providers &&
        Object.values(providers)?.map((provider: any) => (
          <>
            {provider.id !== 'email' && (
              <div key={provider.name} className="mt-2">
                <button
                  className={`btn w-[250px] text-bgColor hover:text-white ${
                    provider.id === 'kakao' ? 'bg-kakao' : 'bg-white'
                  }`}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.id !== 'email' && <img src={`assets/svg/${provider.id}.svg`} alt="logo" className="ml-3" />}
                  {provider.name}로 로그인
                </button>
              </div>
            )}
          </>
        ))}
    </div>
  )
}

export default LoginPage

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
