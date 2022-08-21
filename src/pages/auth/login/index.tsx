import { getProviders, getSession, signIn, signOut } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'
import { trpc } from 'src/utils/trpc'
import { useEffect } from 'react'

function LoginPage({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { data: me } = trpc.useQuery(['users.me'])

  useEffect(() => {
    async function getTest() {
      const session = await getSession()
      console.log(session)
      console.log(me)
      if (!me && session?.id) signOut()
      return session
    }
    getTest()
  }, [])

  if (me?.id) router.replace('/')

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
                  onClick={() => {
                    signIn(provider.id)
                  }}
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

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
