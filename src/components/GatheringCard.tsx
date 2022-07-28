import Link from 'next/link'

export interface IGathering {
  id: number
  categoryList: string[]
  title: string
  date: string
}

type GatheringCardProps = {
  data: IGathering
  isWideView?: boolean
}

const GatheringCard = ({ data, isWideView }: GatheringCardProps) => {
  return (
    <Link href={`/group/${data.id}`}>
      <div
        className={`card bg-slate-400 rounded-xl min-w-[190px] min-h-[${
          isWideView ? '150px' : '185px'
        }] inline-flex flex-shrink-0 mr-3 cursor-pointer ${isWideView && 'mt-2 ml-3'}`}
      >
        <div className="card-body bg-cardBg p-4 px-3 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex">
              {data.categoryList.map(category => (
                <div key={category} className="badge badge-neutral text-2xs mr-2">
                  {category}
                </div>
              ))}
            </div>
            <span>
              <img src="assets/svg/fi_more-vertical.svg" alt="date_icon" className={`${isWideView && 'rotate-90'}`} />
            </span>
          </div>

          <h3 className="mt-3 font-bold">{data.title}</h3>

          <div className="mt-2 text-xs">
            <div className="flex">
              <img src="assets/svg/uiw_date.svg" alt="date_icon" />
              <span className="ml-2 text-textGray">{data.date}</span>
            </div>
            <div className={`font-bold mt-1 text-primary ${isWideView && 'absolute bottom-4 right-4'}`}>마감일 D-5</div>
          </div>

          <div className="avatar items-center mt-5">
            <div className="w-7 rounded-full mr-2">
              <img src="https://placeimg.com/50/50/people" />
            </div>
            <div className="w-7 rounded-full mr-2">
              <img src="https://placeimg.com/50/50/people" />
            </div>
            <div className="w-7 rounded-full">
              <img src="https://placeimg.com/50/50/people" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GatheringCard
