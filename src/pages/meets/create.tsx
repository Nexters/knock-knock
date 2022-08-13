import { ChangeEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'
import format from 'date-fns/format'

import TagInput from '../../components/formElements/TagInput'
import Calendar from 'src/components/Calendar'
import { toast } from 'react-toastify'
import { trpc } from 'src/utils/trpc'
import { useUserContext } from 'src/context/UserContext'
import { useSession } from 'next-auth/react'

interface MeetTags {
  tags?: { text: string }[]
}

function Create() {
  const router = useRouter()
  const { status } = useSession()

  const [showCalendar, setShowCalendar] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [headCounts, setHeadCounts] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isPublicMeet, setIsPublicMeet] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const { mutate } = trpc.useMutation('events.create-event', {
    onSuccess(data) {
      toast('생성 완료!', { autoClose: 2000 })
      router.push(`/invite/${data.id}`)
    },
    onError() {
      toast('생성 실패...', { autoClose: 2000 })
    },
  })

  const calendarText = useMemo(() => {
    if (selectedDates.length === 0) {
      return ''
    }
    if (selectedDates.length === 1) {
      return format(selectedDates[0]!, 'yyyy.MM.dd')
    }
    if (selectedDates.length > 1) {
      return `${format(selectedDates[selectedDates.length - 1]!, 'yyyy.MM.dd')} 외 ${selectedDates.length - 1}일`
    }
  }, [selectedDates])

  const {
    control,
    formState: { errors },
  } = useForm<MeetTags>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const toggleCalendar = () => {
    setShowCalendar(prevShow => !prevShow)
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (title.length >= 15) {
      return
    }
    setTitle(event.target.value)
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (description.length >= 95) {
      return
    }
    setDescription(event.target.value)
  }

  const handleChangeHeadcount = (event: ChangeEvent<HTMLSelectElement>) => {
    setHeadCounts(Number(event.target.value))
  }

  const handleCalenderUpdate = (values: Date[]) => {
    setSelectedDates(values)
  }

  const handleStartTime = (event: ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value)
  }

  const handleEndTime = (event: ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value)
  }

  const toggleIsPublicMeet = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublicMeet(event.target.checked)
  }

  const handleSubmit = () => {
    const tags = fields.map(field => field.text)
    console.log(startTime)
    const dateTimestamp = selectedDates.map(date => {
      return (date.getTime() + Number(startTime.split(':')[0])! * 60 * 60 * 1000) / 1000
    })
    const timeGapStamp =
      (new Date(`2022-07-30T${endTime}`).getTime() - new Date(`2022-07-30T${startTime}`).getTime()) / 1000
    if (timeGapStamp < 0) {
      toast('끝 시간이 시작 시간보다 빠릅니다.')
      return
    }
    // api params
    const payload = {
      title,
      description,
      headCounts,
      tags: tags.join(','),
      startingTimes: dateTimestamp.join(','),
      timeSize: timeGapStamp,
      isPublicMeet,
    }

    mutate(payload)

    // 페이지 이동 (id 매핑 또는 하드코딩)
    // router.push('/invite/:id')
  }

  return (
    <>
      <input checked={status === 'unauthenticated'} readOnly type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box sm:max-w-xs">
          <h3 className="font-bold text-base text-center">어떤 계정으로 로그인 할까요?</h3>
          <div className="flex-col mt-6">
            <button
              onClick={() => router.push({ pathname: '/auth/login', query: { redirect: '/meets/create' } })}
              className="block mx-auto btn w-full max-w-xs mt-2 bg-primary text-white"
            >
              SNS 계정으로 로그인
            </button>
            <button
              onClick={() => router.push({ pathname: '/', query: { redirect: '/meets/create' } })}
              className="block mx-auto btn w-full max-w-xs mt-2 bg-primary text-white"
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
      <section className="flex flex-col items-center bg-bgColor h-screen pt-[1.625rem] pr-[1.25rem] pb-[1.625rem] pl-[1.25rem] overflow-auto">
        <div className="fixed w-full bg-bgColor top-0 pb-4">
          <button onClick={() => router.back()} className="absolute top-9 left-5 ">
            <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer left-0" />
          </button>
          <h1 className="mt-8 text-xl font-bold text-white text-center ">약속 만들기</h1>
        </div>
        <div className="form-control w-full max-w-xs mt-[5.5rem]">
          <label className="label">
            <span className="label-text">약속 제목</span>
          </label>
          <input
            type="text"
            placeholder="약속 제목을 입력해주세요 (15자이내)"
            className="input input-bordered w-full max-w-xs bg-[#2F3035] border-none"
            onChange={handleChangeTitle}
            value={title}
          />
        </div>

        <div className="form-control w-full max-w-xs mt-4">
          <label className="label">
            <span className="label-text">약속 설명</span>
          </label>
          <textarea
            className="textarea h-24 max-w-xs bg-[#2F3035]"
            placeholder="약속 설명을 적어주세요 (95자 이내)"
            onChange={handleChangeDescription}
            value={description}
          ></textarea>
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt">{description.length}/95</span>
          </label>
        </div>

        <TagInput
          label="태그"
          placeholder="태그를 입력해주세요"
          tags={fields}
          onAddTag={tag => {
            if (fields.findIndex(field => field.text === tag) === -1) {
              append({ text: tag })
            } else {
              console.log('이미 동일한 태그가 존재합니다.')
            }
          }}
          onRemoveTag={index => remove(index)}
          classNames="w-full max-w-xs mt-[1.375rem]"
        />

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">모집인원</span>
          </label>
          <select
            className="select select-bordered bg-[#2F3035] border-none"
            onChange={handleChangeHeadcount}
            value={headCounts}
          >
            <option disabled selected>
              모집인원을 선택해주세요
            </option>
            <option value={1}>1명</option>
            <option value={2}>2명</option>
            <option value={3}>3명</option>
            <option value={4}>4명</option>
            <option value={5}>5명</option>
            <option value={6}>6명</option>
          </select>
        </div>

        <div className="form-control w-full max-w-xs mt-5">
          <label className="label">
            <span className="label-text">날짜</span>
          </label>
          <input
            type="text"
            className="select bg-[#2F3035] border-none"
            onClick={toggleCalendar}
            value={calendarText}
          />
        </div>

        {showCalendar && (
          <div className="w-full max-w-xs">
            <Calendar dates={selectedDates} onDatesUpdate={handleCalenderUpdate} />
          </div>
        )}

        <div className="form-control w-full max-w-xs mt-5">
          <label className="label pb-0">
            <span className="label-text font-bold">약속 시간대 설정</span>
          </label>
          <div className="flex w-full justify-between gap-x-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text text-[0.8125rem]">시작</span>
              </label>
              <input
                type="time"
                className="w-full input bg-[#2F3035] border-none text-center"
                onChange={handleStartTime}
                value={startTime}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text text-[0.8125rem]">끝</span>
              </label>
              <input
                type="time"
                className="w-full input bg-[#2F3035] border-none text-center"
                onChange={handleEndTime}
                value={endTime}
              />
            </div>
          </div>
        </div>

        <div className="form-control w-full max-w-xs flex justify-between mt-[2.625rem]">
          <label className="label cursor-pointer">
            <span className="label-text">이 모임을 그룹에 공개할래요</span>
            <input type="checkbox" className="checkbox" checked={isPublicMeet} onChange={toggleIsPublicMeet} />
          </label>
        </div>

        <button className="btn btn-primary w-full max-w-xs mt-[0.5rem]" onClick={handleSubmit}>
          완료
        </button>
      </section>
    </>
  )
}

export default Create
