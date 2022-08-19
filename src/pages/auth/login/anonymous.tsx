import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { signJwt } from 'src/utils/jwt'
import { cls } from 'src/utils/cls'
import { useUser } from 'src/shared/hooks'
import { toast } from 'react-toastify'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

type Inputs = {
  name: string
  password: string
}

export default function CreateAnonymous() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()

  watch()

  const onValid: SubmitHandler<Inputs> = (data: Inputs) => {
    if (router.query?.redirect) router.push(router.query?.redirect as string)
    else {
      toast('에러가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col pb-8 pt-16 px-5 relative bg-bgColor">
      <div>
        <h1 className="font-bold text-center">비회원 로그인</h1>
      </div>

      <form onSubmit={handleSubmit(onValid)}>
        <div className="form-control w-full mt-11">
          <label htmlFor="name" className="label pb-1 pl-0">
            <span className="label-text">이름</span>
          </label>
          <input
            {...register('name', {
              required: '필수 입력 필드입니다.',
              maxLength: { value: 10, message: '10자 이내로 입력해주세요.' },
            })}
            type="text"
            name="name"
            spellCheck="false"
            placeholder="이름을 입력해주세요"
            className={cls('input input-bordered w-full', errors.name ? 'input-error text-error' : '')}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="text-error mt-2 ml-1 text-xs">{message}</p>}
          />
        </div>

        <div className="form-control w-full mt-5">
          <label htmlFor="password" className="label pb-1 pl-0">
            <span className="label-text">비밀번호</span>
          </label>
          <input
            {...register('password', {
              required: '필수 입력 필드입니다.',
              maxLength: { value: 10, message: '10자 이내로 입력해주세요.' },
            })}
            type="password"
            name="password"
            placeholder="10자 이내로 입력해주세요"
            className={cls('input input-bordered w-full', errors.password ? 'input-error text-error' : '')}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="text-error mt-2 ml-1 text-xs">{message}</p>}
          />
        </div>

        <div className="fixed w-full md:max-w-sm px-5 mx-auto mb-6 bottom-0 left-0 right-0">
          <button type="submit" className="w-full btn bg-primary text-white">
            로그인
          </button>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (session) {
    return {
      redirect: { destination: '/' },
      props: {},
    }
  }
  return { props: {} }
}
