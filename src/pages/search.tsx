import { Profile, Event, Participation } from '@prisma/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { trpc } from 'src/utils/trpc'

interface Events extends Event {
  participates: Participation[]
}

export default function SearchPage() {
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])
  const { data: userList } = trpc.useQuery(['users.user-list'])

  const [keyword, setKeyword] = useState('')
  const [searchedUserList, setSearchedUserList] = useState<Partial<Profile>[]>([])
  const [searchedGroupList, setSearchedGroupList] = useState<Partial<Events>[]>([])

  useEffect(() => {
    if (keyword) {
      setSearchedUserList(userList?.filter(user => user.name.includes(keyword))!)
      setSearchedGroupList(events?.filter(event => event.title.toLowerCase().includes(keyword.toLowerCase()))!)
    } else {
      setSearchedUserList([])
      setSearchedGroupList([])
    }
  }, [keyword])

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor px-5">
      <div className="flex itmes-center mb-3">
        <Link href="/">
          <img src="assets/svg/Arrow left.svg" alt="logo" className="cursor-pointer" />
        </Link>
      </div>
      <form className="relative">
        <img src="assets/svg/search.svg" className="absolute top-[14px] left-3 opacity-80" />
        <input
          type="text"
          name="name"
          placeholder="유저, 약속을 검색해보세요"
          className="input input-bordered w-full pl-9"
          onChange={e => setKeyword(e.target.value)}
        />
      </form>
      <span className="font-bold mt-5">검색 결과</span>
      {keyword && (searchedUserList.length > 0 || searchedGroupList.length > 0) && (
        <>
          <div className="bg-cardBg mt-4 p-2 rounded-md">
            <span className="inline-block font-bold text-sm text-textGray">유저</span>
            {searchedUserList.length > 0 ? (
              (searchedUserList ?? []).map(user => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="my-3 flex items-center">
                      <img
                        className="w-[30px] h-[30px] rounded-full"
                        src={user.image || 'assets/svg/logo.svg'}
                        alt="profile"
                      />
                      <span className="text-sm ml-2 text-textGray">{user.name}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-sm text-textGray text-center">검색 결과가 없습니다.</div>
            )}
          </div>
          <div className="bg-cardBg mt-4 p-2 rounded-md">
            <span className="inline-block font-bold text-sm text-textGray">모임</span>
            {searchedGroupList?.length > 0 ? (
              (searchedGroupList ?? []).map(event => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="my-3 flex items-center">
                      <img className="w-[30px] h-[30px] rounded-full" src="assets/svg/logo.svg" alt="profile" />
                      <span className="text-sm ml-2 text-textGray">{event.title}</span>
                    </div>
                    {event?.participates && (
                      <span className="text-xs text-textGray2">참여자 {event?.participates?.length}명</span>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-sm text-textGray text-center">검색 결과가 없습니다.</div>
            )}
          </div>
        </>
      )}
      {keyword && searchedGroupList.length === 0 && searchedUserList.length === 0 && (
        <div className="text-sm text-textGray text-center mt-20">검색 결과가 없습니다.</div>
      )}
    </div>
  )
}
