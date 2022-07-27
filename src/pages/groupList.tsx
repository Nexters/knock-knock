import GatheringCard from 'src/components/GatheringCard'
import Link from 'next/link'

export default function GroupListPage() {
  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor">
      <div className="flex itmes-center mt-9 px-5">
        <Link href="/">
          <img src="assets/svg/Arrow left.svg" alt="logo" className="cursor-pointer" />
        </Link>
        <h2 className="text-lg font-bold ml-2">약속 모임</h2>
      </div>
      <div className="mt-2 flex flex-col overflow-auto">
        {gatheringCardData.map(gatheringCard => (
          <GatheringCard isWideView data={gatheringCard} />
        ))}
      </div>
    </div>
  )
}

const gatheringCardData = [
  {
    id: 1,
    categoryList: ['밥약', '넥스터즈'],
    title: '뼈찜모임 모여라',
    date: '2020-07-24',
  },
  {
    id: 2,
    categoryList: ['술약', '넥스터즈'],
    title: '수제맥주 뿌실분',
    date: '2020-07-24',
  },
  {
    id: 3,
    categoryList: ['커피챗', '넥스터즈'],
    title: '면접 꿀팁 알려주세요',
    date: '2020-07-24',
  },
]
