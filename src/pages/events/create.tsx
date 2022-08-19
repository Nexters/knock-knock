import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import TagInput from '../../components/formElements/TagInput'
import Calendar from 'src/components/Calendar'
import { toast } from 'react-toastify'
import { trpc } from 'src/utils/trpc'
import { CreateEventInputSchema } from '../../schema/eventSchema'
import LoginModal from 'src/components/modals/LoginModal'
import { useCustomRouter, useUser } from 'src/shared/hooks'
import TopTitleBottomBtnLayout from 'src/components/pageLayouts/TopTitleBottomBtnLayout'
import { cls } from 'src/utils/cls'
import { getCanlendarText } from 'src/utils/time'

export interface CreateEventInput {
  selectedGroup?: string
  title: string
  description: string
  headCounts: number
  isUnlimitedHeadCounts: boolean
}

function Create() {
  const router = useCustomRouter()
  const { isAuthenticated, user } = useUser()

  const [createPhase, setCreatePhase] = useState(1)

  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [tags, setTags] = useState<{ id?: string; text: string }[]>([])
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<CreateEventInput>({
    defaultValues: {
      title: '',
      description: '',
      headCounts: 2,
      isUnlimitedHeadCounts: false,
    },
  })

  const { title, description, isUnlimitedHeadCounts, headCounts, selectedGroup } = watch()

  const { mutate } = trpc.useMutation('events.create-event', {
    onSuccess(data) {
      toast('생성 완료!', { autoClose: 2000 })
      router.push(`/invites/${data.id}`)
    },
    onError() {
      toast('생성 실패...', { autoClose: 2000 })
    },
  })

  const calendarText = getCanlendarText(selectedDates)

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

  function onFormValid() {
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
    const payload: CreateEventInputSchema = {
      title,
      description,
      tags: tags.map(tag => tag.text).join(','),
      startingTimes: dateTimestamp.join(','),
      timeSize: timeGapStamp,
      isUnlimitedHeadCounts,
      groupId: selectedGroup,
    }

    if (!isUnlimitedHeadCounts && Number(headCounts) > 0) {
      payload.headCounts = Number(headCounts)
    }

    console.log(payload)

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
      <form onSubmit={handleSubmit(onFormValid)}>
        {createPhase === 1 && (
          <TopTitleBottomBtnLayout {...{ title: '약속 만들기', btnText: '다음', onBottomBtnClick: handleNextPhase }}>
            <div className="mt-8 w-full">
              {/* TODO: groupId 있으면 해당 그룹을 기본으로 선택 */}
              {isAuthenticated && (
                <div className="form-control w-full">
                  <select
                    disabled={!user?.groups?.length}
                    className={cls(
                      'select select-bordered bg-[#2F3035] border-none',
                      !selectedGroup ? 'text-[#9ca3af]' : '',
                    )}
                    {...register('selectedGroup')}
                  >
                    <option value="" className="text-[#9ca3af]">
                      그룹을 선택해주세요(선택)
                    </option>
                    {user?.groups?.map(group => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}

              <div className="form-control w-full mt-5">
                <input
                  type="text"
                  placeholder="약속 제목을 입력해주세요 (15자 이내)"
                  className="input w-full bg-base-100 border-none"
                  {...register('title', {
                    maxLength: 15,
                    required: '제목은 반드시 입력해야 합니다.',
                  })}
                />
              </div>

              <div className="form-control w-full mt-2">
                <textarea
                  className="textarea h-24 bg-[#2F3035]"
                  placeholder="약속 설명을 적어주세요 (95자 이내)"
                  {...register('description', { maxLength: 95, required: '설명은 반드시 입력해야 합니다.' })}
                ></textarea>
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt">{description.length}/95</span>
                </label>
              </div>

              <TagInput
                label="태그는 3개까지 가능해요(선택)"
                placeholder="5자 이내로 적어주세요"
                tags={tags}
                onChange={setTags}
                classNames="w-full  mt-[1.375rem]"
              />

              <div className="form-control w-full ">
                <div className="flex justify-between">
                  <label className="label">
                    <span className="label-text">모집인원</span>
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text text-[#747579] mr-[9px]">인원제한 없음</span>
                    <input type="checkbox" className="checkbox" {...register('isUnlimitedHeadCounts')} />
                  </label>
                </div>
                <div className="form-control w-full mt-2">
                  <input
                    type="number"
                    min={2}
                    placeholder="모집인원을 입력해주세요"
                    className="input w-full bg-base-100 border-none"
                    disabled={isUnlimitedHeadCounts}
                    {...register('headCounts')}
                  />
                </div>
              </div>
            </div>
          </TopTitleBottomBtnLayout>
        )}

        {createPhase === 2 && (
          <TopTitleBottomBtnLayout
            {...{
              title: '약속 만들기',
              btnText: '완료',
              onBackBtnClick: handleBackBtnClick,
              onBottomBtnClick: handleSubmit(onFormValid),
            }}
          >
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">후보 날짜</span>
              </label>
              <input type="text" className="select bg-[#2F3035] border-none" value={calendarText} onChange={() => {}} />
            </div>

            <div className="w-full ">
              <Calendar dates={selectedDates} onDatesUpdate={handleCalenderUpdate} />
            </div>

            <div className="form-control w-full  mt-5">
              <label className="label pb-0">
                <span className="label-text font-bold">약속 시간대</span>
              </label>
              <div className="flex w-full justify-between gap-x-2">
                <div className="form-control w-1/2">
                  <input
                    type="time"
                    className="w-full input bg-[#2F3035] border-none text-center"
                    onChange={handleStartTime}
                    value={startTime}
                    size={60000}
                  />
                  <label className="label flex justify-end">
                    <span className="label-text text-[0.8125rem]">부터</span>
                  </label>
                </div>
                <div className="form-control w-1/2">
                  <input
                    type="time"
                    className="w-full input bg-[#2F3035] border-none text-center"
                    onChange={handleEndTime}
                    value={endTime}
                  />
                  <label className="label flex justify-end">
                    <span className="label-text text-[0.8125rem]">까지</span>
                  </label>
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
      </form>
    </>
  )
}

export default Create
