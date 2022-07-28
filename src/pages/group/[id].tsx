import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IGathering } from 'src/components/GatheringCard'

interface TGroupDetail extends IGathering {
  participants: string[]
}

export default function GroupDetail() {
  const [detail, setDetail] = useState<TGroupDetail>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const gatheringDetail = gatheringDetailList.filter(detail => {
      return detail.id === Number(id)
    })
    setDetail({ ...gatheringDetail[0] } as TGroupDetail)
  }, [id])

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor px-5">
      {/* <div className="flex justify-between items-center">
        <Link href="/">
          <img src="/assets/svg/logo.svg" alt="logo" />
        </Link>
      </div> */}

      <div className="flex itmes-center mt-5">
        <Link href="/">
          <img src="/assets/svg/Arrow left.svg" alt="logo" className="cursor-pointer" />
        </Link>
        <h2 className="text-lg font-bold ml-2">약속 모임</h2>
      </div>

      <div className="flex align-center justify-between mt-7">
        <div>
          {detail?.categoryList?.map(category => (
            <div key={category} className="badge badge-neutral text-2xs mr-2">
              {category}
            </div>
          ))}
        </div>
        <div className={`font-bold mt-1 text-primary`}>마감일 D-5</div>
      </div>
      <h2 className="mt-3 text-xl font-bold">{detail?.title}</h2>

      <div className="mt-7 flex flex-col">
        <span className="text-sm text-textGray mb-2">날짜</span>
        <select className="select w-full max-w-s mt-3 bg-cardBg text-textGray">
          <option disabled selected>
            날짜 선택
          </option>
          <option>2022.08.02</option>
          <option>2022.08.03</option>
          <option>2022.08.04</option>
          <option>2022.08.05</option>
          <option>2022.08.06</option>
        </select>
      </div>

      <div className="mt-7 flex flex-col">
        <span className="text-sm text-textGray mb-2">참여자</span>
        <div className="xs:max-h-[50%] sm:max-h-[100%] overflow-auto">
          {detail?.participants?.map((person: string) => {
            return (
              <div className="flex items-center justify-between bg-cardBg p-3 rounded-lg mt-2">
                <div className="avatar flex items-center">
                  <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/50/50/people" />
                  </div>

                  <div className="ml-3 font-bold">{person}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex justify-between mt-10 p-5 w-[100%] bg-bgColor md:max-w-sm md:static md:p-0">
        <button className="btn w-[160px]">모임 참여하기</button>
        <button className="btn w-[160px]">확정시간 선택하기</button>
      </div>
    </div>
  )
}

const gatheringDetailList = [
  {
    id: 1,
    categoryList: ['밥약', '넥스터즈'],
    title: '뼈찜모임 모여라',
    date: '2020-07-24',
    participants: ['윤지영', '김태우', '이지원', '신창선', '김희원', '강소현'],
  },
  {
    id: 2,
    categoryList: ['술약', '넥스터즈'],
    title: '수제맥주 뿌실분',
    date: '2020-07-24',
    participants: ['윤지영', '김태우', '이지원', '신창선'],
  },
  {
    id: 3,
    categoryList: ['커피챗', '넥스터즈'],
    title: '면접 꿀팁 알려주세요',
    date: '2020-07-24',
    participants: ['윤지영', '김태우', '이지원', '신창선'],
  },
]
