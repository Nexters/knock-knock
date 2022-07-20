import { signIn, signOut, useSession } from 'next-auth/react'

// const LoginForm = dynamic(() => import('../components/LoginForm'), {
//   ssr: false,
// })

function LoginPage() {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    return (
      <>
        <div>로그인됨!!</div>
        <p>Welcome {session.user?.name}</p>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    )
  } else {
    return (
      <div>
        You need to login
        <button onClick={() => signIn()}>login</button>
      </div>
    )
  }
}

export default LoginPage
