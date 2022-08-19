import Link from 'next/link'
import format from 'date-fns/format'

import { trpc } from 'src/utils/trpc'
import { IEvent } from 'src/types/Event'

type GatheringCardProps = {
  data: IEvent
  isWideView?: boolean
  onMoreButtonClick?: () => void
}

export interface IGathering {
  id: number
  categoryList: string[]
  title: string
  date: string
}

const GatheringCard = ({ data, isWideView, onMoreButtonClick }: GatheringCardProps) => {
  const {
    data: groupData,
    isLoading,
    error,
  } = trpc.useQuery(['groups.single-group', { groupId: data.groupId as string }], { enabled: !!data.groupId })

  return (
    <div
      className={`min-w-[190px] min-h-[${
        isWideView ? '150px' : '185px'
      }] relative inline-flex flex-shrink-0 cursor-pointer ${isWideView ? 'mt-2' : 'mr-3'}`}
    >
      {onMoreButtonClick && (
        <button onClick={onMoreButtonClick} className={`absolute top-4 right-3 z-50`}>
          <img src="assets/svg/fi_more-vertical.svg" alt="date_icon" />
        </button>
      )}
      <Link href={`/invites/${data.id}`}>
        <div className="w-full h-full card rounded-xl">
          <div className="card-body bg-cardBg p-4 px-3 text-white relative">
            <div className="h-5 flex items-center">
              {data.groupId && <div className="badge badge-accent text-2xs mr-1">{groupData?.name}</div>}
              <div className="flex">
                {(data.tags?.split(',') ?? []).map(category => (
                  <div key={category} className="badge badge-ghost text-2xs mr-1">
                    {category}
                  </div>
                ))}
              </div>
            </div>

            <h3 className="mt-3 font-bold">{data.title}</h3>

            <div className="mt-1 text-xs">
              <div className="flex">
                <img src="assets/svg/uiw_date.svg" alt="date_icon" />
                <span className="ml-2 text-textGray">
                  {data?.startingTimes[0] &&
                    format(new Date(Number(data?.startingTimes?.split(',')?.[0]) * 1000), 'MM월 dd일')}
                  {data && data?.startingTimes.length > 1 && ` 외 ${data?.startingTimes?.split(',')?.length - 1}일`}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-end">
                <span className={`${isWideView ? 'text-to' : 'text-textGray3'} font-bold text-xs`}>
                  {data.participates.length}/{data.headCounts}명 참여중
                </span>
                {isWideView && (
                  <div className="avatar flex">
                    {(data?.participates.slice(0, 2) ?? []).map(participate => (
                      <div key={participate.id} className="w-7 h-7 rounded-full overflow-hidden mr-1">
                        <img src={participate.profile.image ?? `/assets/images/avatar.png`} />
                      </div>
                    ))}
                    {data?.participates.length < 3 && (
                      <div className="w-7 h-7 rounded-full border border-borderGray inline-flex justify-center items-center">
                        <span className="font-bold text-xs text-textGray2">+{data?.participates.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GatheringCard
