import type { NextPage } from 'next'
import Link from 'next/link'
import LoginForm from '../components/LoginForm'
import CenteringLayout from '../components/pageLayouts/CenteringLayout'
import { useUserContext } from '../context/UserContext'

const Home: NextPage = () => {
  const user = useUserContext()

  if (!user) {
    return (
      <CenteringLayout seoTitle="우만시 HOME">
        <LoginForm />
      </CenteringLayout>
    )
  }

  return (
    <CenteringLayout seoTitle="우만시 HOME">
      <Link href="/posts/new">Create post</Link>
    </CenteringLayout>
  )
}

export default Home
