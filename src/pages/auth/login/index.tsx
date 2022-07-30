import { getProviders, signIn, getSession } from 'next-auth/react'
import { InferGetServerSidePropsType, NextPageContext } from 'next'
import { useRouter } from 'next/router'

function LoginPage({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center py-5 pt-9 px-5 relative h-screen bg-bgColor">
      <img src="/assets/svg/logo.svg" alt="logo" className="mb-10 w-[220px]" />
      {providers &&
        Object.values(providers)?.map((provider: any) => (
          <div key={provider.name}>
            {provider.id !== 'email' && (
              <div className="mt-2">
                <button
                  className={`btn w-[250px] text-bgColor hover:text-white ${
                    provider.id === 'kakao' ? 'bg-kakao' : 'bg-white'
                  }`}
                  onClick={() => signIn(provider.id, { callbackUrl: (router.query.redirect as string) ?? '/' })}
                >
                  {provider.id !== 'email' && (
                    <img src={`/assets/svg/${provider.id}.svg`} alt="logo" className="ml-3 mr-1" />
                  )}
                  {provider.name}로 로그인
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default LoginPage

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
