import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ICreateProfile } from 'src/schema/userSchema'
import { trpc } from 'src/utils/trpc'

export default function NewUser() {
  const { handleSubmit, register } = useForm<ICreateProfile>()
  const { query, basePath, pathname, push } = useRouter()
  const { mutate, error } = trpc.useMutation('users.create-profile')
  const { data: session } = useSession()

  const onValid: SubmitHandler<ICreateProfile> = async (formValues: ICreateProfile) => {
    if (!query.callbackUrl) return
    if (!session?.user) return
    if (!formValues.name) return
    await mutate({ ...session.user, ...formValues, oauthId: session.id as string })
    push(query.callbackUrl as string)
  }

  return (
    <div className="flex flex-col py-5 pt-9 px-5 relative h-screen bg-bgColor">
      <div>
        <h1 className="font-bold">이름을 입력해주세요</h1>
        <p className="text-sm">다른 이용자들이 보게될 이름입니다.</p>
      </div>

      <form onSubmit={handleSubmit(onValid)}>
        <div className="form-control w-full mt-5">
          <label htmlFor="name" className="label pb-1 pl-0">
            <span className="label-text">이름</span>
          </label>
          <input
            {...register('name', { required: true })}
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full max-w-sm mx-auto mb-10 fixed bottom-0 left-0 right-0 px-5">
          <button type="submit" className="w-full btn bg-primary text-white">
            확인
          </button>
        </div>
      </form>
    </div>
  )
}
