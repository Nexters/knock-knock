import { useSession } from 'next-auth/react'
import Link from 'next/link'
import GatheringCard from 'src/components/GatheringCard'
import { useUserContext } from 'src/context/UserContext'
import { useRouter } from 'next/router'
// import MyGroupCard from 'src/components/MyGroupCard'
import { trpc } from 'src/utils/trpc'

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  const user = useUserContext()
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])

  return (
    <div className="flex flex-col py-5 pt-9 relative h-screen bg-bgColor">
      <div className="flex justify-between items-center px-5 ">
        <img src="assets/svg/logo.svg" alt="logo" />
        {/* <span className="mr-3">
          <img src="assets/svg/search.svg" alt="logo" />
        </span> */}
      </div>

      <div className="px-5 mt-5">
        <div className="card bg-gradient-to-r from-from to-to rounded-xl">
          {status === 'authenticated' ? (
            <div className="card-body p-4 relative">
              <div>
                <div className="avatar items-center">
                  <div className="w-10 rounded-full">
                    <img src={user?.image ?? 'assets/images/avatar.png'} />
                  </div>
                  <div className="ml-3 font-bold">{user?.name}</div>
                </div>
              </div>
              <div className="mt-3">
                {user?.tags?.split(',').map(tag => {
                  return (
                    <div key={tag} className="badge badge-secondary mr-2">
                      {tag.trim()}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="card-body p-4">
              <div className="ml-3 font-bold">
                <Link href="/api/auth/signin">
                  <span className="underline underline-offset-1 cursor-pointer">로그인</span>
                </Link>{' '}
                후 이용하시겠습니까?
              </div>
            </div>
          )}
          {status === 'authenticated' && (
            <Link href="/profile">
              <span className="absolute right-3 top-3 text-white p-2 cursor-pointer">
                <img src="assets/svg/Edit_outlined.svg" alt="logo" />
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center px-5 overflow-auto">
          <h2 className="text-lg font-bold">약속 모임</h2>
          <button className="text-sm text-textGray">
            {/* <Link href="/groupList">더보기</Link> */}
            필터
          </button>
        </div>
        <div className="mx-2 mt-2 pb-2 flex flex-col overflow-auto xs:max-h-[75%] sm:max-h-[100%]">
          {(events ?? []).map((event, index) => (
            <GatheringCard key={index} isWideView data={event} />
          ))}
        </div>
      </div>

      {/* <div className="mt-9 px-5">
        <div className="flex itmes-center justify-between">
          <h2 className="text-lg font-bold">내 그룹</h2>
          <Link href="/group/create">
            <a className="flex items-center">
              <img src="assets/svg/createGroup.svg" alt="logo" />
              <div className="text-sm text-textGray ml-1">새 그룹 만들기</div>
            </a>
          </Link>
        </div>

        <div className="mt-8">
          {mygroupData.map((mygroup, index) => (
            <MyGroupCard key={index} data={mygroup} />
          ))}
        </div>
      </div> */}
      <div className="w-full md:max-w-sm fixed bottom-10 auto flex justify-end">
        <button
          className="btn btn-circle bg-primary text-white mr-5"
          onClick={() => {
            router.push('/meets/create')
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const mygroupData = [
  {
    title: '[공식] NEXTERS',
    numOfPeople: 234,
  },
  {
    title: '[비공식] 땡땡고 동창회',
    numOfPeople: 100,
  },
  {
    title: '[공식] 넥스터즈 산악회',
    numOfPeople: 12,
  },
  {
    title: '[공식] 개발자 클라이밍 동호회',
    numOfPeople: 12,
  },
]
