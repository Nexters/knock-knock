import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signJwt } from 'src/utils/jwt'

type Inputs = {
  name: string
  password: string
}

export default function CreateAnonymous() {
  const { handleSubmit, register } = useForm<Inputs>()
  const { query, push } = useRouter()

  const onValid: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data)
    console.log(signJwt(data))
  }

  return (
    <div className="flex flex-col py-5 pt-9 px-5 relative h-screen bg-bgColor">
      <div>
        <h1 className="font-bold">비회원 로그인</h1>
        <p className="text-sm">비회원이면 모임 수정 불가능 해요!</p>
      </div>

      <form onSubmit={handleSubmit(onValid)}>
        <div className="form-control w-full mt-5">
          <label htmlFor="name" className="label pb-1 pl-0">
            <span className="label-text">이름</span>
          </label>
          <input
            {...register('name')}
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full mt-5">
          <label htmlFor="password" className="label pb-1 pl-0">
            <span className="label-text">비밀번호 (선택)</span>
          </label>
          <input
            {...register('password')}
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full max-w-sm mx-auto mb-10 fixed bottom-0 left-0 right-0 px-5">
          <button type="submit" className="w-full btn bg-primary text-white">
            로그인
          </button>
        </div>
      </form>
    </div>
  )
}
