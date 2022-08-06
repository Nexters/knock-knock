import { Profile, Event, Participation } from '@prisma/client'
import { useEffect, useState } from 'react'
import { trpc } from 'src/utils/trpc'

interface SearchedArr extends Profile, Event {
  participates: Participation[]
}

export default function SearchPage() {
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])
  const { data: userList } = trpc.useQuery(['users.user-list'])

  const [keyword, setKeyword] = useState('')
  const [searchedList, setSearchedList] = useState<Partial<SearchedArr>[]>([])

  useEffect(() => {
    if (keyword) {
      const filteredUserList = userList?.filter(user => user.name.includes(keyword))
      const filteredEventList = events?.filter(user => user.title.toLowerCase().includes(keyword.toLowerCase()))
      setSearchedList([...(filteredEventList ?? []), ...(filteredUserList ?? [])])
    } else {
      setSearchedList([])
    }
  }, [keyword])

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor px-5">
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
      <div>
        {(searchedList ?? []).map(listItem => {
          return (
            <div className="flex items-center justify-between">
              <div className="my-3 flex items-center">
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src={listItem.image || 'assets/svg/logo.svg'}
                  alt="profile"
                />
                <span className="text-sm ml-2 text-textGray">{listItem.name || listItem.title}</span>
              </div>
              {listItem?.participates && (
                <span className="text-sm text-textGray2">참여자 {listItem?.participates?.length}명</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
