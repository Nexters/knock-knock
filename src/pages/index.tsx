import Link from 'next/link'
import GatheringCard from 'src/components/GatheringCard'
import SEO from 'src/components/pageLayouts/SEO'
import { useRouter } from 'next/router'
import { trpc } from 'src/utils/trpc'
import { useUser } from 'src/shared/hooks'

export default function Home() {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])

  return (
    <SEO>
      <div className="flex flex-col py-5 pt-9 relative bg-bgColor">
        <div className="flex justify-between items-center px-5 ">
          <object data="assets/svg/logo.svg" />
          <Link href="/search">
            <span className="mr-3 cursor-pointer">
              <img src="assets/svg/search.svg" alt="icon" />
            </span>
          </Link>
        </div>

        <div className="px-5 mt-5">
          <div className="card bg-gradient-to-r from-from to-to rounded-xl">
            {isAuthenticated ? (
              <>
                <div className="card-body p-4 relative">
                  <div>
                    <div className="avatar items-center">
                      <div className="w-10 h-10 rounded-full">
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
                <div className="mt-3">
                  {user?.tags?.split(',').map(tag => {
                    return (
                      <div key={tag} className="badge badge-secondary mr-2">
                        {tag.trim()}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="card-body p-4">
                <div className="ml-3 font-bold">
                  <Link href="/auth/login">
                    <span className="underline underline-offset-1 cursor-pointer">로그인</span>
                  </Link>{' '}
                  후 이용하시겠습니까?
                </div>
              </div>
            )}
            {isAuthenticated && (
              <Link href="/profile">
                <span className="absolute right-3 top-3 text-white p-2 cursor-pointer">
                  <img src="assets/svg/Edit_outlined.svg" alt="logo" />
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center px-5">
            <h2 className="text-lg font-bold">약속 모임</h2>
            <button className="text-sm text-textGray">필터</button>
          </div>
          <div className="mx-2 mt-2 pb-2 flex flex-col">
            {(events ?? []).map((event, index) => {
              return <GatheringCard key={index} isWideView data={event} />
            })}
          </div>
        </div>
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
    </SEO>
  )
}
