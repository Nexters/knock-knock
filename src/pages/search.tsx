import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Profile, Event, Participation, Group } from '@prisma/client'
import { trpc } from 'src/utils/trpc'

interface Events extends Event {
  participates: Participation[]
}

export default function SearchPage() {
  const router = useRouter()
  const { data: userList } = trpc.useQuery(['users.user-list'])
  const { data: groups } = trpc.useQuery(['groups.groups'])
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])

  const [keyword, setKeyword] = useState('')
  const [searchedUserList, setSearchedUserList] = useState<Partial<Profile>[]>([])
  const [searchedEventList, setSearchedEventList] = useState<Partial<Events>[]>([])
  const [searchedGroupList, setSearchedGroupList] = useState<Partial<Group>[]>([])

  useEffect(() => {
    if (keyword) {
      setSearchedUserList(userList?.filter(user => user.name.includes(keyword))!)
      setSearchedEventList(events?.filter(event => event.title.toLowerCase().includes(keyword.toLowerCase()))!)
      setSearchedGroupList(groups?.filter(group => group.name.toLowerCase().includes(keyword.toLowerCase()))!)
    } else {
      setSearchedUserList([])
      setSearchedEventList([])
      setSearchedGroupList([])
    }
  }, [keyword])

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor px-5">
      <div className="flex itmes-center mb-3">
        <Link href="/">
          <img src="/assets/svg/Arrow left.svg" alt="logo" className="cursor-pointer" />
        </Link>
      </div>
      <form className="relative">
        <img src="/assets/svg/search.svg" className="absolute top-[14px] left-3 opacity-80" />
        <input
          type="text"
          name="name"
          placeholder="유저, 약속을 검색해보세요"
          className="input input-bordered w-full pl-9"
          onChange={e => setKeyword(e.target.value)}
        />
      </form>
      <span className="font-bold mt-5">검색 결과</span>
      {keyword && (searchedUserList.length > 0 || searchedEventList.length > 0 || searchedGroupList.length > 0) && (
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
                        src={user.image || '/assets/svg/logo.svg'}
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
            <span className="inline-block font-bold text-sm text-textGray">약속</span>
            {searchedEventList?.length > 0 ? (
              (searchedEventList ?? []).map(event => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="my-3 flex items-center">
                      <img className="w-[30px] h-[30px] rounded-full" src="/assets/svg/logo.svg" alt="profile" />
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
          <div className="bg-cardBg mt-4 p-2 rounded-md">
            <span className="inline-block font-bold text-sm text-textGray">그룹</span>
            {searchedGroupList?.length > 0 ? (
              (searchedGroupList ?? []).map(group => {
                return (
                  <div className="flex items-center justify-between" onClick={() => router.push(`/groups/${group.id}`)}>
                    <div className="my-3 flex items-center">
                      <img className="w-[30px] h-[30px] rounded-full" src="/assets/svg/logo.svg" alt="profile" />
                      <span className="text-sm ml-2 text-textGray">{group.name}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-sm text-textGray text-center">검색 결과가 없습니다.</div>
            )}
          </div>
        </>
      )}
      {keyword && searchedEventList.length === 0 && searchedUserList.length === 0 && searchedGroupList.length === 0 && (
        <div className="text-sm text-textGray text-center mt-20">검색 결과가 없습니다.</div>
      )}
    </div>
  )
}
