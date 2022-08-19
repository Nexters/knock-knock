import Link from 'next/link'
import format from 'date-fns/format'
import { SingleGroupOutput } from 'src/types/group'
import { Event, Participation, Profile } from '@prisma/client'
import { getCanlendarText, startingTimesToDates } from 'src/utils/time'

type GatheringCardProps = {
  group?: SingleGroupOutput
  event: Event & { participates?: (Participation & { profile?: Profile })[] }
  isWideView?: boolean
  onMoreButtonClick?: () => void
}

const GatheringCard = ({ event, group, isWideView, onMoreButtonClick }: GatheringCardProps) => {
  return (
    <div
      className={`min-w-[190px] min-h-[${
        isWideView ? '150px' : '185px'
      }] relative inline-flex flex-shrink-0 cursor-pointer ${isWideView ? 'mt-2 w-full' : 'mr-3'}`}
    >
      {onMoreButtonClick && (
        <button onClick={onMoreButtonClick} className={`absolute top-4 right-3 z-50`}>
          <img src="/assets/svg/fi_more-vertical.svg" alt="more_icon" />
        </button>
      )}
      <Link href={`/invites/${event?.id}`}>
        <div className="w-full h-full card rounded-xl">
          <div className="card-body bg-cardBg p-4 px-3 text-white relative">
            <div className="h-5 flex items-center">
              {event?.groupId && <div className="badge badge-accent text-2xs mr-1">{group?.name}</div>}
              <div className="flex">
                {(event?.tags?.split(',') ?? []).map(category => (
                  <div key={category} className="badge badge-ghost text-2xs mr-1">
                    {category}
                  </div>
                ))}
              </div>
            </div>

            <h3 className="mt-3 font-bold">{event?.title}</h3>

            <div className="mt-1 text-xs">
              <div className="flex">
                <img src="/assets/svg/uiw_date.svg" alt="date_icon" />
                <span className="ml-2 text-textGray">
                  {getCanlendarText(startingTimesToDates(event?.startingTimes))}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-end">
                <span className={`${isWideView ? 'text-to' : 'text-textGray3'} font-bold text-xs`}>
                  {event?.participates?.length ?? 0}/{event?.headCounts ?? 0}명 참여중
                </span>
                {isWideView && (
                  <div className="avatar flex">
                    {(event?.participates?.slice(0, 2) ?? []).map(participate => (
                      <div key={participate.id} className="w-7 h-7 rounded-full overflow-hidden mr-1">
                        <img src={participate?.profile?.image ?? `/assets/images/avatar.png`} />
                      </div>
                    ))}
                    {(event?.participates?.length ?? 0) > 3 && (
                      <div className="w-7 h-7 rounded-full border border-borderGray inline-flex justify-center items-center">
                        <span className="font-bold text-xs text-textGray2">
                          +{(event?.participates?.length ?? 0) - 3}
                        </span>
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
