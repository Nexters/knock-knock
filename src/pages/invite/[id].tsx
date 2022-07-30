import { FormEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { trpc } from 'src/utils/trpc'
import format from 'date-fns/format'

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

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const {
    data: eventData,
    isLoading,
    error,
  } = trpc.useQuery(['events.single-event', { eventId: router.query.id as string }])

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
      {isLoading && (
        <div className="text-primary font-bold w-full h-full flex justify-center items-center">로딩중...</div>
      )}
      {error && (
        <div className="text-primary font-bold w-full h-full flex justify-center items-center">
          에러가 발생했습니다.
        </div>
      )}
      {eventData && (
        <>
          <h1 className="mt-12 text-xl font-bold text-white text-center">모임에 초대해요!</h1>
          <div className="mt-11 px-5">
            <p className="text-base font-bold">{eventData?.title}</p>
            <p className="mt-1 text-xs text-textGray">
              {eventData?.startingTimes[0] &&
                format(new Date(Number(eventData?.startingTimes?.split(',')?.[0]) * 1000), 'yyyy.MM.dd')}
              {eventData &&
                eventData?.startingTimes.length > 1 &&
                ` 외 ${eventData?.startingTimes?.split(',')?.length - 1}일`}
            </p>
            <p className="mt-3 text-sm bg-cardBg rounded-lg p-4">{eventData?.description}</p>
            <div className="mt-3">
              {(eventData?.tags?.split(',') ?? []).map(category => (
                <div key={category} className="badge badge-md mr-2 mb-2">
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 px-5">
            <h2 className="text-sm font-bold">참여 인원</h2>
            <p className="mt-2 mb-3 text-sm bg-cardBg rounded-lg p-3">{eventData?.participates.length}명</p>
            <div>
              {eventData?.participates?.map(participate => (
                <div key={participate.id} className="badge badge-lg text-white mr-2 mb-2">
                  {participate.profile.name}
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

          {/* TODO: 로그인모달 컴포넌트화 */}
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
        </>
      )}
    </div>
  )
}
