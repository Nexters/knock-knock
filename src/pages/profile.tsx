import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from 'src/shared/hooks'

export default function Profile() {
  const { user, isAuthenticated, isLoadingUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      router.push('/')
    }
  }, [])

  return (
    <div className="flex flex-col py-5 pt-2 relative bg-bgColor">
      <div className="flex itmes-center justify-between mt-5 px-3">
        <Link href="/">
          <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer" />
        </Link>
        <img src="/assets/svg/Edit_outlined.svg" alt="icon" className="cursor-pointer" />
      </div>

      <div className="flex flex-col items-center justify-center mt-7">
        <div className="w-[70px] h-[70px] rounded-[20px] overflow-hidden object-cover">
          <img className="" src={`${user?.image}` ?? 'assets/images/avatar.png'} />
        </div>
        <div className="flex mt-5">
          {user?.tags?.split(',').map(tag => {
            return <div className="badge badge-lg badge-neutral mr-2">{tag.trim()}</div>
          })}
        </div>
        <span className="text-3xl font-bold mt-2">{user?.name}</span>
        <span className="text-center text-sm text-textGray max-w-[250px] mt-5">{user?.introduction}</span>
      </div>

      <div className="flex justify-between items-center px-5 mt-5">
        <h2 className="text-lg font-bold text-textGray">이때 가장 여유로워요!</h2>
        <button className="text-sm text-textGray">더보기</button>
      </div>
      <div className="flex mt-5 px-5">
        <div className="badge badge-lg badge-success mr-2">월요일</div>
        <div className="badge badge-lg badge-success mr-2">화요일</div>
        <div className="badge badge-lg badge-success mr-2">수요일</div>
      </div>

      <div className="flex pl-5 mt-5 overflow-x-scroll">
        <div className="min-w-[160px] min-h-[130px] bg-cardBg rounded-lg flex flex-col items-center justify-center mr-3 py-3">
          <img className="w-[70px]" src="/assets/images/badge1.png" alt="badge" />
          <span className="text-sm text-textGray mt-1">[넥스터즈]</span>
          <span className="font-bold mt-3">이달의 약속왕</span>
        </div>
        <div className="min-w-[160px] min-h-[130px] bg-cardBg rounded-lg flex flex-col items-center justify-center mr-3 py-3">
          <img className="w-[70px]" src="/assets/images/badge1.png" alt="badge" />
          <span className="text-sm text-textGray mt-1">[넥스터즈]</span>
          <span className="font-bold mt-3">이달의 약속왕</span>
        </div>
        <div className="min-w-[160px] min-h-[130px] bg-cardBg rounded-lg flex flex-col items-center justify-center py-3">
          <img className="w-[70px]" src="/assets/images/badge1.png" alt="badge" />
          <span className="text-sm text-textGray mt-1">[넥스터즈]</span>
          <span className="font-bold mt-3">이달의 약속왕</span>
        </div>
      </div>

      <button className="btn btn-primary mx-5 mt-10 fixed bottom-5 ">약속 요청하기</button>
    </div>
  )
}
