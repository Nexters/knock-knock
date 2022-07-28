import { getProviders, signIn } from 'next-auth/react'

function LoginPage({ providers }: any) {
  console.log(providers)

  return (
    <>
      {providers &&
        Object.values(providers)?.map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        ))}
    </>
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
