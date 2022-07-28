import { FormEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Invite {
  id: number
  title: string
  date: string[]
  description: string
  categoryList: string[]
  participants: string[]
}

export default function Invite() {
  const { status } = useSession()
  const router = useRouter()

  const [inviteData, setInviteData] = useState<Invite>()
  const [isVisibleModal, setIsVisibleModal] = useState(false)

  useEffect(() => {
    const inviteInfo = inviteInfoList.find(detail => {
      return detail.id === Number(router.query.id)
    })
    setInviteData(inviteInfo)
  }, [router.query.id])

  const onCopyToClipboard = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const currentUrl = window.document.location.href
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success('링크가 복사되었습니다.')
      })
      .catch(() => {
        toast.error('복사를 다시 시도해주세요.')
      })
  }

  const onSelectTime = () => {
    if (status === 'unauthenticated') {
      setIsVisibleModal(true)
    } else {
      router.push(`/events/${router.query.id}`)
    }
  }

  return (
    <div className="flex flex-col py-4 relative h-screen bg-bgColor">
      <button onClick={() => router.back()} className="absolute top-9 left-5">
        <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer" />
      </button>
      <h1 className="mt-12 text-xl font-bold text-white text-center">모임에 초대해요!</h1>
      <div className="mt-11 px-5">
        <p className="text-base font-bold">{inviteData?.title}</p>
        <p className="mt-1 text-xs text-textGray">
          {inviteData?.date[0]}
          {inviteData && inviteData?.date.length > 1 && ` 외 ${inviteData?.date.length - 1}일`}
        </p>
        <p className="mt-3 text-sm bg-cardBg rounded-lg p-4">{inviteData?.description}</p>
        <div className="mt-3">
          {inviteData?.categoryList?.map(category => (
            <div key={category} className="badge badge-md mr-2 mb-2">
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 px-5">
        <h2 className="text-sm font-bold">참여 인원</h2>
        <p className="mt-2 mb-3 text-sm bg-cardBg rounded-lg p-3">{inviteData?.participants.length}명</p>
        <div>
          {inviteData?.participants?.map(participant => (
            <div key={participant} className="badge badge-lg text-white mr-2 mb-2">
              {participant}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-6 flex justify-between w-[100%] px-5 md:max-w-sm">
        <button onClick={onCopyToClipboard} className="btn w-[48%] bg-white text-primary">
          링크 공유
        </button>
        <button onClick={onSelectTime} className="btn w-[48%] bg-gradient-to-r from-from to-to text-white">
          시간 선택하기
        </button>
      </div>
      <input checked={isVisibleModal} readOnly type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal items-center">
        <div className="modal-box py-8 rounded-2xl sm:max-w-xs">
          <button onClick={() => setIsVisibleModal(false)} className="btn btn-ghost absolute right-0 top-0">
            ✕
          </button>
          <h3 className="font-bold text-base text-center">어떤 계정으로 로그인 할까요?</h3>
          <button
            onClick={() => router.push({ pathname: '/api/auth/signin' })}
            className="block mx-auto btn w-full max-w-xs mt-4 bg-primary text-white"
          >
            SNS 계정으로 로그인
          </button>
        </div>
      </div>
      <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={1000} hideProgressBar={true} transition={Slide} />
    </div>
  )
}

const inviteInfoList: Invite[] = [
  {
    id: 1,
    title: '뼈찜모임 모여라',
    date: ['2020-07-24'],
    description: '맛있는 뼈찜 같이 먹으러 가요~',
    categoryList: ['밥약', '넥스터즈'],
    participants: ['윤지영', '김태우', '이지원', '신창선', '김희원', '강소현'],
  },
  {
    id: 2,
    title: '수제맥주 뿌실분',
    date: ['2020-07-24', '2020-07-28'],
    description: '맥주러버 여기로 모이세요! 같이 맛있는 수제맥주도 마시고 즐거운 대화도 나누어봅시다 ㅎㅎ',
    categoryList: ['술약', '넥스터즈'],
    participants: ['윤지영', '김태우', '이지원', '신창선'],
  },
  {
    id: 3,
    title: '면접 꿀팁 알려주세요',
    date: ['2020-07-24', '2020-07-25', '2020-07-26'],
    description: '다음주에 면접이 있는데 첫 면접이라 떨리네요 ㅜㅜ 꿀팁 전수해주실 분 찾습니다!',
    categoryList: ['커피챗', '넥스터즈'],
    participants: ['윤지영', '김태우', '이지원', '신창선'],
  },
]
