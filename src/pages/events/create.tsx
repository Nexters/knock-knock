import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import format from 'date-fns/format'

import TagInput from '../../components/formElements/TagInput'
import Calendar from 'src/components/Calendar'
import { toast } from 'react-toastify'
import { trpc } from 'src/utils/trpc'
import { useSession } from 'next-auth/react'
import { ICreateEvent } from '../../schema/eventSchema'
import LoginModal from 'src/components/modals/LoginModal'
import { useCustomRouter } from 'src/shared/hooks'
import TitleHeader from 'src/components/TitleHeader'
import TopTitleBottomBtnLayout from 'src/components/pageLayouts/TopTitleBottomBtnLayout'

interface EventTags {
  tags?: { text: string }[]
}

function Create() {
  const router = useCustomRouter()
  const { status } = useSession()

  const { data: groups, isLoading, error } = trpc.useQuery(['groups.groups'])

  const [createPhase, setCreatePhase] = useState(1)

  const [selectedGroup, setSelectedGroup] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [headCounts, setHeadCounts] = useState(0)
  const [isUnlimitedHeadCounts, setIsUnlimitedHeadCounts] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')

  const { mutate } = trpc.useMutation('events.create-event', {
    onSuccess(data) {
      toast('생성 완료!', { autoClose: 2000 })
      router.push(`/invites/${data.id}`)
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
  } = useForm<EventTags>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

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

  const handleToggleIsUnlimitedHeadCount = () => {
    setIsUnlimitedHeadCounts(prev => !prev)
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

  const handleChangeTimeSlot = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTimeSlot(event.target.value)
  }

  const handleBackBtnClick = () => {
    setCreatePhase(prevState => prevState - 1)
  }

  const handleNextPhase = () => {
    setCreatePhase(prevState => prevState + 1)
  }

  const handleSubmit = () => {
    const tags = fields.map(field => field.text)
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
    const payload: ICreateEvent = {
      title,
      description,
      tags: tags.join(','),
      startingTimes: dateTimestamp.join(','),
      timeSize: timeGapStamp,
      isUnlimitedHeadCounts,
      groupId: selectedGroup,
    }

    if (!isUnlimitedHeadCounts && headCounts > 0) {
      payload.headCounts = headCounts
    }

    mutate(payload)
  }

  useEffect(() => {
    if (selectedTimeSlot === 'allday') {
      setStartTime('00:00')
      setEndTime('23:59')
    }
    if (selectedTimeSlot === 'am') {
      setStartTime('00:00')
      setEndTime('12:00')
    }
    if (selectedTimeSlot === 'pm') {
      setStartTime('12:00')
      setEndTime('00:00')
    }
  }, [selectedTimeSlot])

  return (
    <>
      <LoginModal />
      {createPhase === 1 && (
        <TopTitleBottomBtnLayout {...{ title: '약속 만들기', btnText: '다음', onBottomBtnClick: handleNextPhase }}>
          {/* TODO: groupId 있으면 해당 그룹을 기본으로 선택 */}
          {status === 'authenticated' && (
            <div className="form-control w-full">
              <div className="flex justify-between">
                <label className="label">
                  <span className="label-text">그룹</span>
                </label>
              </div>
              <select
                className="select select-bordered bg-[#2F3035] border-none"
                onChange={e => {
                  setSelectedGroup(e.target.value)
                }}
                value={selectedGroup}
              >
                <option>그룹을 선택해주세요</option>
                {groups?.map(group => {
                  return (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">약속 제목</span>
            </label>
            <input
              type="text"
              placeholder="약속 제목을 입력해주세요 (15자 이내)"
              className="input input-bordered w-full bg-[#2F3035] border-none"
              onChange={handleChangeTitle}
              value={title}
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">약속 설명</span>
            </label>
            <textarea
              className="textarea h-24 bg-[#2F3035]"
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
            classNames="w-full  mt-[1.375rem]"
          />

          <div className="form-control w-full ">
            <div className="flex justify-between">
              <label className="label">
                <span className="label-text">모집인원</span>
              </label>
              <label className="label cursor-pointer">
                <span className="label-text text-[#747579] mr-[9px]">인원제한 없음</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isUnlimitedHeadCounts}
                  onChange={handleToggleIsUnlimitedHeadCount}
                />
              </label>
            </div>
            <select
              className="select select-bordered bg-[#2F3035] border-none"
              onChange={handleChangeHeadcount}
              value={headCounts}
              disabled={isUnlimitedHeadCounts}
            >
              <option disabled defaultValue={1}>
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
        </TopTitleBottomBtnLayout>
      )}

      {createPhase === 2 && (
        <TopTitleBottomBtnLayout
          {...{
            title: '약속 만들기',
            btnText: '완료',
            onBackBtnClick: handleBackBtnClick,
            onBottomBtnClick: handleSubmit,
          }}
        >
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">날짜</span>
            </label>
            <input type="text" className="select bg-[#2F3035] border-none" value={calendarText} onChange={() => {}} />
          </div>

          <div className="w-full ">
            <Calendar dates={selectedDates} onDatesUpdate={handleCalenderUpdate} />
          </div>

          <div className="form-control w-full  mt-5">
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

          <div className="form-control w-full flex justify-between mt-[1.1875rem]">
            <label className="label cursor-pointer flex justify-start">
              <input
                type="radio"
                name="time"
                className="radio"
                value={'allday'}
                checked={selectedTimeSlot === 'allday'}
                onChange={handleChangeTimeSlot}
              />
              <span className="label-text ml-[0.75rem]">하루종일</span>
            </label>
            <label className="label cursor-pointer flex justify-start">
              <input
                type="radio"
                name="time"
                className="radio"
                value={'am'}
                checked={selectedTimeSlot === 'am'}
                onChange={handleChangeTimeSlot}
              />
              <span className="label-text ml-[0.75rem]">오전만</span>
            </label>
            <label className="label cursor-pointer flex justify-start">
              <input
                type="radio"
                name="time"
                className="radio"
                value={'pm'}
                checked={selectedTimeSlot === 'pm'}
                onChange={handleChangeTimeSlot}
              />
              <span className="label-text ml-[0.75rem]">오후만</span>
            </label>
          </div>
        </TopTitleBottomBtnLayout>
      )}
    </>
  )
}

export default Create
