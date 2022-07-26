import { useForm } from 'react-hook-form'

export default function Login() {
  const { handleSubmit } = useForm()

  function onValid(e: any) {}

  return (
    <div className="flex flex-col py-5 pt-9 px-5 relative h-screen bg-bgColor">
      <div>
        <h1 className="font-bold">회원 로그인</h1>
        <p className="text-sm">SNS 계정으로 가입할 수 있어요!</p>
      </div>

      <form onSubmit={handleSubmit(onValid)}>
        <div className="form-control w-full mt-5">
          <label htmlFor="name" className="label pb-1 pl-0">
            <span className="label-text">이름</span>
          </label>
          <input type="text" name="name" placeholder="이름을 입력해주세요" className="input input-bordered w-full" />
        </div>

        <div className="form-control w-full mt-5">
          <label htmlFor="name" className="label pb-1 pl-0">
            <span className="label-text">비밀번호 (선택)</span>
          </label>
          <input
            type="password"
            name="name"
            placeholder="비밀번호를 입력해주세요"
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full max-w-sm mx-auto mb-10 fixed bottom-0 left-0 right-0 px-5">
          <button className="w-full btn bg-primary text-white">로그인</button>
        </div>
      </form>
    </div>
  )
}
