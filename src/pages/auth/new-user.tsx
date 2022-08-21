import { ErrorMessage } from '@hookform/error-message'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ICreateProfile } from 'src/schema/userSchema'
import { trpc } from 'src/utils/trpc'
import { authOptions } from '../api/auth/[...nextauth]'

export default function NewUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICreateProfile>()
  const router = useRouter()
  const { data: me } = trpc.useQuery(['users.me'])
  const utils = trpc.useContext()

  const { mutate, error } = trpc.useMutation('users.create-profile', {
    onSuccess: async () => {
      await utils.invalidateQueries(['users.me'])
      router.replace((router.query.redirect as string) ?? '/')
    },
  })
  const { data: session } = useSession()

  if (me?.id) router.replace((router.query.redirect as string) ?? '/')

  const onValid: SubmitHandler<ICreateProfile> = async (formValues: ICreateProfile) => {
    if (!session?.user) {
      toast.warn('문제가 발생했습니다. knockknock.me@gmail.com 으로 문의부탁드립니다.')
      return
    }
    if (!formValues.name) {
      toast.error('이름은 반드시 입력해야합니다.')
      return
    }
    try {
      mutate({ ...session.user, ...formValues, oauthId: session.id as string })
    } catch (error) {
      alert('뭔가 잘못됐어요..')
    }
  }

  return (
    <div className="flex flex-col py-5 pt-9 px-5 relative h-screen bg-bgColor">
      <div>
        <h1 className="font-bold text-lg">이름 및 본인 소개를 입력해주세요</h1>
        <p className="text-sm text-textGray mt-3">다른 이용자들에게 보여집니다.</p>
      </div>

      <form onSubmit={handleSubmit(onValid)}>
        <div className="form-control w-full mt-5">
          <label htmlFor="name" className="label pb-1 pl-0">
            <span className="label-text text-textGray">이름</span>
          </label>
          <input
            {...register('name', {
              required: '필수 입력 필드입니다.',
              maxLength: { value: 10, message: '10자 이내로 입력해주세요.' },
            })}
            type="text"
            name="name"
            placeholder="ex) 김노크"
            className="input input-bordered w-full"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="text-error mt-2 ml-1 text-xs">{message}</p>}
          />
          <label htmlFor="tag" className="label pb-1 pl-0 mt-4">
            <span className="label-text text-textGray">태그</span>
          </label>
          <input
            {...register('tags')}
            type="text"
            name="tags"
            placeholder="ex) 개발자, ENFJ, 냥집사"
            className="input input-bordered w-full"
          />
          <ErrorMessage
            errors={errors}
            name="tags"
            render={({ message }) => <p className="text-error mt-2 ml-1 text-xs">{message}</p>}
          />

          <label htmlFor="introduction" className="label pb-1 pl-0 mt-4">
            <span className="label-text text-textGray">소개 (선택)</span>
          </label>
          <textarea
            {...register('introduction', { required: false })}
            name="introduction"
            placeholder="ex) 안녕하세요! 노크노크의 부릉부릉입니다 :)"
            className="textarea textarea-bordered w-full"
          />
          <ErrorMessage
            errors={errors}
            name="introduction"
            render={({ message }) => <p className="text-error mt-2 ml-1 text-xs">{message}</p>}
          />
        </div>

        <div className="w-full md:max-w-sm mx-auto mb-10 fixed bottom-0 left-0 right-0 px-5">
          <button type="submit" className="w-full btn bg-primary text-white">
            확인
          </button>
        </div>
      </form>
    </div>
  )
}
