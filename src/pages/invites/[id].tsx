import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { trpc } from 'src/utils/trpc'
import { useCustomRouter, useUser } from 'src/shared/hooks'
import TopTitleBottomBtnLayout from 'src/components/pageLayouts/TopTitleBottomBtnLayout'
import Calendar from 'src/components/Calendar'
import { getCanlendarText, getFormattedTimeString, setZeroHoursMinutes, startingTimesToDates } from 'src/utils/time'
import addSeconds from 'date-fns/addSeconds'

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
  const [calendarVisible, setCalendarVisible] = useState(true)
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

  const dates = startingTimesToDates(eventData?.startingTimes)
  const calendarText = getCanlendarText(dates)
  const timeRangeText = dates.length
    ? `${getFormattedTimeString(dates[0])} - ${getFormattedTimeString(addSeconds(dates[0]!, eventData?.timeSize!))}`
    : ''

  const onSelectTime = () => {
    router.push(`/events/${router.query.id}`)
  }

  function toggleCalendarVisibility() {
    setCalendarVisible(prev => !prev)
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
            <p className="mt-1 text-xs text-textGray"></p>
            {eventData.tags
              ? eventData.tags.split(',').map(tag => (
                  <div key={tag} className="badge bg-base-100 border-none py-4 px-3 text-white gap-2">
                    {tag}
                  </div>
                ))
              : null}
            <div className="mt-3 text-sm text-textGray2 bg-base-100 rounded-lg p-4">{eventData?.title}</div>
            <div className="mt-3 text-sm text-textGray2 bg-base-100 rounded-lg p-4 min-h-[8rem]">
              {eventData?.description}
            </div>

            <div className="mt-7">
              <h2 className="text-sm text-whiteGray">참여 인원</h2>
              <p className="mt-2 mb-3 text-sm text-textGray2 bg-base-100 rounded-lg p-3">
                {eventData?.participates.length}명 / {eventData.headCounts}명
              </p>
              <div className="flex items-center">
                {eventData?.participates?.map(participate => {
                  return (
                    <div key={participate.id} className="badge badge-lg text-white mr-2 mb-2 py-4 text-sm">
                      <img className="w-6 rounded-lg mr-2" src={participate.profile.image || ''} />
                      {participate.profile.name}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <div className="form-control w-full" onClick={toggleCalendarVisibility}>
                <label className="label">
                  <span className="label-text">후보 날짜</span>
                </label>
                <input
                  type="text"
                  readOnly
                  className="select bg-base-100 border-none text-sm text-textGray2"
                  value={calendarText}
                />
              </div>

              {calendarVisible && (
                <div className="">
                  <Calendar dates={dates.map(date => setZeroHoursMinutes(date))} onDatesUpdate={() => {}} />
                </div>
              )}
            </div>

            <div className="form-control w-full mt-5">
              <label className="label">
                <span className="label-text">약속 시간대</span>
              </label>
              <div className="mt-3 text-sm text-textGray2 text-center bg-base-100 rounded-lg p-4">{timeRangeText}</div>
            </div>
          </div>
        </TopTitleBottomBtnLayout>
      )}
    </div>
  )
}
