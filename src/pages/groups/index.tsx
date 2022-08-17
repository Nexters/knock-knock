import React from 'react'
import { trpc } from 'src/utils/trpc'
import MyGroupCard from 'src/components/MyGroupCard'
import { useCustomRouter } from 'src/shared/hooks'

function GroupListPage() {
  const router = useCustomRouter()
  const { data: groups } = trpc.useQuery(['groups.groups'])

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor">
      <div className="fixed w-full bg-bgColor top-0 pb-4">
        <button onClick={() => router.back()} className="absolute top-9 left-5 ">
          <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer left-0" />
        </button>
        <h1 className="mt-8 text-xl font-bold text-white text-center">그룹 전체 보기</h1>
      </div>
      <div className="px-5 mt-20">
        {groups?.map((group, index) => {
          return <MyGroupCard key={index} data={group as any} />
        })}
      </div>
    </div>
  )
}

export default GroupListPage
