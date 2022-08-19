import React from 'react'
import { trpc } from 'src/utils/trpc'
import MyGroupCard from 'src/components/MyGroupCard'
import TitleHeader from 'src/components/TitleHeader'

function GroupListPage() {
  const { data: groups } = trpc.useQuery(['groups.groups'])

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor">
      <TitleHeader title="그룹 전체 보기" />
      <div className="px-5 mt-20">
        {groups?.map((group, index) => {
          return <MyGroupCard key={index} data={group} />
        })}
      </div>
    </div>
  )
}

export default GroupListPage
