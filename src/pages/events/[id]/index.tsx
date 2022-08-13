import { Participation } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TimeSelectTable from 'src/components/TimeSelectTable'
import { useUserContext } from 'src/context/UserContext'
import { trpc } from 'src/utils/trpc'
import { toast } from 'react-toastify'

export default function Event() {
  const { status } = useSession()
  const { push, query } = useRouter()
  const { data: eventData, isLoading, error } = trpc.useQuery(['events.single-event', { eventId: query.id as string }])
  const utils = trpc.useContext()
  const { mutate } = trpc.useMutation('events.my-cells', {
    onSuccess() {
      toast('저장 완료!', { autoClose: 2000 })
    },
    onError() {
      toast('저장 실패...', { autoClose: 2000 })
    },
  })
  const user = useUserContext()

  const participates = eventData?.participates ?? []
  const myParticipation: Participation | undefined = participates.find(
    participate => participate.profileId === user?.id,
  )

  const [selectedCells, setSelectedCells] = useState(new Set<string>())
  const [isResultView, setIsResultView] = useState<boolean>(false)
  const [resultCellCount, setResultCellCount] = useState<{ [key: string]: number }>({})
  const [maximumCount, setMaximumCount] = useState(1)

  useEffect(() => {
    const myCells = (myParticipation?.selectedCells ?? '').split(',')
    setSelectedCells(new Set(myCells))
  }, [myParticipation])

  useEffect(() => {
    const counts = participates.reduce<{ [key: string]: number }>((accu, curr) => {
      if (curr.profileId === user?.id) return accu
      const selectedCells = (curr?.selectedCells ?? '').split(',')
      selectedCells.forEach(cellId => {
        if (accu[cellId]) {
          accu[cellId] += 1
          if (accu[cellId]! > maximumCount) {
            setMaximumCount(accu[cellId] as number)
          }
        } else {
          accu[cellId] = 1
        }
      })
      return accu
    }, {})
    const myCells = [...selectedCells]
    myCells.forEach(cellId => {
      if (counts[cellId]) counts[cellId] += 1
      else counts[cellId] = 1
    })
    setResultCellCount(counts)
  }, [isResultView])

  function updateSelectedCells() {
    if (!query.id || !user?.id) return
    mutate({ eventId: query.id as string, profileId: user.id, cells: [...selectedCells].join(',') })
  }

  function deselectAll() {
    setSelectedCells(new Set<string>([]))
    if (!query.id || !user?.id) return
    mutate({ eventId: query.id as string, profileId: user.id, cells: '' })
  }

  function addOneCell(cellId: string) {
    setSelectedCells(prev => new Set([...prev, cellId]))
  }

  function removeOneCell(cellId: string) {
    setSelectedCells(prev => new Set([...prev].filter(x => x !== cellId)))
  }

  function addOrRemoveOneCell(cellId: string) {
    if (selectedCells.has(cellId)) removeOneCell(cellId)
    else addOneCell(cellId)
  }

  function handleCellSelect(cellIds: string[], isDelete?: boolean) {
    if (cellIds.length === 1) {
      if (cellIds?.[0]) addOrRemoveOneCell(cellIds[0])
      return
    }
    if (isDelete) {
      cellIds.forEach(id => {
        if (selectedCells.has(id)) removeOneCell(id)
      })
      return
    }
    setSelectedCells(prev => new Set([...prev, ...cellIds]))
  }

  return (
    <>
      <input checked={status === 'unauthenticated'} readOnly type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box sm:max-w-xs">
          <h3 className="font-bold text-base text-center">어떤 계정으로 로그인 할까요?</h3>
          <div className="flex-col mt-6">
            <button
              onClick={() => push({ pathname: '/auth/login', query: { redirect: query.id } })}
              className="block mx-auto btn w-full max-w-xs mt-2 bg-primary text-white"
            >
              SNS 계정으로 로그인
            </button>
            <button
              onClick={() => push({ pathname: '/', query: { redirect: query.id } })}
              className="block mx-auto btn w-full max-w-xs mt-2 bg-primary text-white"
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-9 h-screen relative bg-bgColor">
        <div className="flex justify-between items-center ml-5">
          <Link href="/">
            <img src="/assets/svg/logo.svg" alt="logo" />
          </Link>
        </div>

        <div className="mt-7 h-2/3 text-bgColor">
          {isLoading && (
            <div className="text-primary font-bold w-full h-full flex justify-center items-center">로딩중...</div>
          )}
          {error && (
            <div className="text-primary font-bold w-full h-full flex justify-center items-center">
              에러가 발생했습니다.
            </div>
          )}
          {eventData && (
            <TimeSelectTable
              startingTimes={eventData?.startingTimes?.split(',')?.map(timestamp => Number(timestamp) * 1000) ?? []}
              timeInterval={eventData?.timeInterval ? eventData.timeInterval * 1000 : undefined}
              timeSize={eventData?.timeSize ? eventData.timeSize * 1000 : 60 * 60 * 6 * 1000}
              selectedIds={selectedCells}
              onSelect={handleCellSelect}
              onSelectEnd={updateSelectedCells}
              isResultView={isResultView}
              resultCellCount={resultCellCount}
              maximumCount={maximumCount}
            />
          )}
        </div>

        <div className="fixed bottom-6 flex justify-between w-[100%] px-5 md:max-w-sm">
          {isResultView ? (
            <button onClick={() => setIsResultView(!isResultView)} className="btn w-[100%] bg-white text-cardBg">
              다시 선택하기
            </button>
          ) : (
            <>
              <button onClick={deselectAll} className="btn w-[42%] bg-white text-cardBg">
                초기화
              </button>
              <button
                onClick={() => setIsResultView(!isResultView)}
                className="btn w-[54%] bg-gradient-to-r from-from to-to text-white"
              >
                결과 보기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
