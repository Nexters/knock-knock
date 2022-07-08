import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false,
})

function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
