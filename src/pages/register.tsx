import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/userSchema'
import { trpc } from '../utils/trpc'
import CenteringLayout from '../components/pageLayouts/CenteringLayout'
import Input from '../components/formElements/Input'
import Button from '../components/formElements/Button'

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      router.push('/login')
    },
  })

  function onSubmit(values: CreateUserInput) {
    mutate(values)
  }

  return (
    <CenteringLayout seoTitle="회원가입">
      <div className="w-full px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && error.message}
          <h1>Register</h1>

          <Input
            name="email"
            classNames="text-left"
            label="이메일"
            type="email"
            placeholder="jane.doe@example.com"
            register={register('email', {
              required: true,
            })}
          />
          <br />
          <Input
            label="닉네임"
            classNames="text-left"
            type="text"
            placeholder="Tom"
            register={register('name', {
              required: true,
            })}
          />
          <Button type="submit">Register</Button>
        </form>
        <Button onClick={() => router.push('/login')}>로그인</Button>
      </div>
    </CenteringLayout>
  )
}

export default RegisterPage
