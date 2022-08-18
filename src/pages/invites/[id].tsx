import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { trpc } from 'src/utils/trpc'
import format from 'date-fns/format'
import { useCustomRouter, useUser } from 'src/shared/hooks'
import TopTitleBottomBtnLayout from 'src/components/pageLayouts/TopTitleBottomBtnLayout'
import Calendar from 'src/components/Calendar'

interface Invite {
  id: number
  title: string
  date: string[]
  description: string
  categoryList: string[]
  participants: string[]
}

export default function Invite() {
  const router = useCustomRouter()
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
      {isLoading && <div className="text-primary font-bold w-full h-full flex justify-center items-center"></div>}
      {error && (
        <div className="text-primary font-bold w-full h-full flex justify-center items-center">
          에러가 발생했습니다.
        </div>
      )}
      {eventData && (
        <TopTitleBottomBtnLayout
          title="약속에 초대해요!"
          customBtns={
            <div className="flex justify-between">
              <button onClick={onCopyToClipboard} className="btn w-[48%] bg-white text-base-100">
                링크 공유
              </button>
              <button onClick={onSelectTime} className="btn w-[48%] bg-gradient-to-r from-from to-to text-white">
                시간 선택하기
              </button>
            </div>
          }
        >
          <div className="flex flex-col w-full">
            <p className="mt-1 text-xs text-textGray">
              {eventData?.startingTimes[0] &&
                format(new Date(Number(eventData?.startingTimes?.split(',')?.[0]) * 1000), 'yyyy.MM.dd')}
              {eventData &&
                eventData?.startingTimes.length > 1 &&
                ` 외 ${eventData?.startingTimes?.split(',')?.length - 1}일`}
            </p>
            {eventData.tags
              ? eventData.tags
                  .split(',')
                  .map(tag => <div key={tag} className="badge bg-base-100 border-none py-4 px-3 text-white gap-2" />)
              : null}
            <div className="mt-3 text-sm text-textGray2 bg-cardBg rounded-lg p-4">{eventData?.title}</div>
            <div className="mt-3 text-sm text-textGray2 bg-cardBg rounded-lg p-4 min-h-[8rem]">
              {eventData?.description}
            </div>

            <div className="mt-7">
              <h2 className="text-sm text-whiteGray">참여 인원</h2>
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
            <div className="mt-5 flex flex-col">
              <span className="text-sm text-whiteGray">후보날짜</span>
              <div className="w-full ">
                <Calendar dates={[]} onDatesUpdate={() => {}} />
              </div>
              {/* <select className="select w-full max-w-s mt-3 bg-cardBg text-textGray">
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
              </select> */}
            </div>
          </div>
        </TopTitleBottomBtnLayout>
      )}
    </div>
  )
}
