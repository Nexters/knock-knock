import Link from 'next/link'

import { IGroup } from 'src/types/Group'

type MyGroupProps = {
  data: IGroup
}

const MyGroupCard = ({ data }: MyGroupProps) => {
  return (
    <Link href={`/groups/${data.id}`}>
      <div className="flex items-center justify-between bg-cardBg p-3 rounded-lg mt-2 w-[100%]">
        <div className="flex items-center">
          <div className="font-bold text-base text-textLightGray">{data.name}</div>
          <div className="ml-2 text-xs text-textGray2">참여 {data.members.length}명</div>
        </div>
        <img src="/assets/svg/right.svg" alt="logo" />
      </div>
    </Link>
  )
}

export default MyGroupCard
