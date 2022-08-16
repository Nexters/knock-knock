import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { trpc } from 'src/utils/trpc'
import format from 'date-fns/format'
import { useUser } from 'src/shared/hooks'

interface Invite {
  id: number
  title: string
  date: string[]
  description: string
  categoryList: string[]
  participants: string[]
}

export default function Invite() {
  const router = useRouter()
  const { user } = useUser()

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
    if (!user) {
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
        <div className="overflow-auto">
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
          <div className="mt-7 px-5">
            <h2 className="text-sm font-bold">참여 인원</h2>
            <p className="mt-2 mb-3 text-sm bg-cardBg rounded-lg p-3">{eventData?.participates.length}명</p>
            <div className="flex items-center">
              {eventData?.participates?.map(participate => {
                return (
                  <div key={participate.id} className="badge badge-lg text-white mr-2 mb-2 text-sm">
                    <img className="w-[20px] rounded-lg mr-2" src={participate.profile.image || ''} />
                    {participate.profile.name}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-col px-5">
            <span className="text-sm text-textGray mb-2">날짜</span>
            <select className="select w-full max-w-s mt-3 bg-cardBg text-textGray">
              <option disabled defaultValue="">
                날짜 선택
              </option>
              {eventData?.startingTimes?.split(',').map(date => {
                return (
                  <option key={date} value={date}>
                    {format(new Date(Number(date) * 1000), 'yyyy.MM.dd')}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="mt-20 flex justify-between w-[100%] px-5 sm:max-w-sm">
            <button onClick={onCopyToClipboard} className="btn w-[48%] bg-white text-primary">
              링크 공유
            </button>
            <button onClick={onSelectTime} className="btn w-[48%] bg-gradient-to-r from-from to-to text-white">
              시간 선택하기
            </button>
          </div>

          {/* TODO: 로그인모달 컴포넌트화 */}
          <input checked={isVisibleModal} readOnly type="checkbox" id="my-modal-4" className="modal-toggle" />
          <div className="modal items-center bg-bgColor bg-opacity-80">
            <div className="modal-box py-8 rounded-2xl sm:max-w-xs">
              <button onClick={() => setIsVisibleModal(false)} className="btn btn-ghost absolute right-0 top-0">
                ✕
              </button>
              <h3 className="font-bold text-base text-center">어떤 계정으로 로그인 할까요?</h3>
              <button
                onClick={() =>
                  router.push({ pathname: '/auth/login', query: { redirect: `/invites/${router.query.id}` } })
                }
                className="block mx-auto btn w-full max-w-xs mt-4 bg-primary text-white"
              >
                SNS 계정으로 로그인
              </button>
              <button
                onClick={() => router.push({ pathname: '/auth/login/anonymous', query: { redirect: router.asPath } })}
                className="block mx-auto btn w-full max-w-xs mt-2 bg-neutral text-white"
              >
                비회원 로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}