import { ChangeEvent, useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'
import getUnixTime from 'date-fns/getUnixTime'
import format from 'date-fns/format'

import TagInput from '../../components/formElements/TagInput'

interface MeetTags {
  tags?: { id: string; text: string }[]
}

function Create() {
  const router = useRouter()

  const [showCalendar, setShowCalendar] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [headcount, setHeadcount] = useState(0)
  const [calendar, setCalendar] = useState<Date>(new Date())
  const [formattedDates, setFormattedDates] = useState<string[]>([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isPublicMeet, setIsPublicMeet] = useState(false)

  const calendarText = useMemo(() => {
    if (formattedDates.length === 0) {
      return ''
    }
    if (formattedDates.length === 1) {
      return formattedDates[0]
    }
    if (formattedDates.length > 1) {
      return `${formattedDates[0]} 외 ${formattedDates.length - 1}일`
    }
  }, [formattedDates])

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
    setTitle(event.target.value.trim())
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (description.length >= 95) {
      return
    }
    setDescription(event.target.value.trim())
  }

  const handleChangeHeadcount = (event: ChangeEvent<HTMLSelectElement>) => {
    setHeadcount(Number(event.target.value))
  }

  const handleCalender = (value: Date, event: ChangeEvent<HTMLInputElement>) => {
    console.log({ value })
    setCalendar(value)
    setFormattedDates(prev => [...prev, format(value, 'yyyy.MM.dd')])
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
    const formattedStartTime = Number(startTime.split(':')[0])
    const formattedEndTime = Number(endTime.split(':')[0])
    const dateTimestamp = formattedDates.map(date => {
      const [year, month, day] = date.split('.')
      return getUnixTime(new Date(Number(year), Number(month), Number(day), Number(formattedStartTime)))
    })
    const timeGapStamp = (formattedEndTime - formattedStartTime) * 60 * 60

    console.log({ tags })

    // api params
    const params = {
      title,
      description,
      tags,
      headcount,
      dateTimestamp,
      timeGapStamp,
      isPublicMeet,
    }

    // 페이지 이동 (id 매핑 또는 하드코딩)
    router.push('/invite/:id')
  }

  return (
    <section className="flex flex-col items-center bg-bgColor h-screen pt-[1.625rem] pr-[1.25rem] pb-[1.625rem] pl-[1.25rem] overflow-auto">
      <button onClick={() => router.back()} className="absolute top-9 left-5">
        <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer" />
      </button>
      <h1 className="mt-12 text-xl font-bold text-white text-center">약속 만들기</h1>

      <div className="form-control w-full max-w-xs mt-[3.125rem]">
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

      <div className="form-control w-full max-w-xs">
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
          value={headcount}
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

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">날짜</span>
        </label>
        <input type="text" className="select bg-[#2F3035] border-none" onClick={toggleCalendar} value={calendarText} />
      </div>
      {showCalendar && <Calendar onChange={handleCalender} value={calendar} locale={'en'} />}

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">약속 시간대 설정</span>
        </label>
        <div className="flex gap-x-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[0.8125rem]">시작</span>
            </label>
            <input
              type="text"
              className="w-full input bg-[#2F3035] border-none text-center"
              onChange={handleStartTime}
              value={startTime}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[0.8125rem]">끝</span>
            </label>
            <input
              type="text"
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

      <button className="btn btn-primary btn-wide w-full max-w-xs mt-[0.5rem]" onClick={handleSubmit}>
        완료
      </button>
    </section>
  )
}

export default Create
