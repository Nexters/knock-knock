import { Participation } from '@prisma/client'
import { useEffect, useState } from 'react'
import TimeSelectTable from 'src/components/TimeSelectTable'
import { trpc } from 'src/utils/trpc'
import { toast } from 'react-toastify'
import { useCustomRouter, useUser } from 'src/shared/hooks'
import LoginModal from 'src/components/modals/LoginModal'
import TopTitleBottomBtnLayout from 'src/components/pageLayouts/TopTitleBottomBtnLayout'
import ConfirmModal from 'src/components/modals/ConfirmModal'

export default function Event() {
  const router = useCustomRouter()
  const {
    data: eventData,
    isLoading,
    error,
  } = trpc.useQuery(['events.single-event', { eventId: router.query.id as string }])
  const { mutate } = trpc.useMutation('events.my-cells', {
    onSuccess() {
      toast('저장 완료!', { autoClose: 2000 })
    },
    onError() {
      toast('저장 실패...', { autoClose: 2000 })
    },
  })
  const { data: me } = trpc.useQuery(['users.me'])
  const [isLoginModalShown, setIsLoginModalShown] = useState(false)

  useEffect(() => {
    if (!me) setIsLoginModalShown(true)
  }, [me])

  async function updateSelectedCells() {
    if (!router.query.id || !user?.id) return
    await mutate({ eventId: router.query.id as string, profileId: user.id, cells: [...selectedCells].join(',') })
    router.push({ pathname: '/events/[id]/completed', query: { id: router.query.id } })
  }

  async function updateResultCells() {
    if (!router.query.id || !user?.id) return
    // await mutate({ eventId: router.query.id as string, profileId: user.id, cells: [...selectedCells].join(',') })
    router.push({ pathname: '/events/[id]/result', query: { id: router.query.id } })
  }

  const { user, isLoadingUser, isAuthenticated } = useUser()

  const participates = eventData?.participates ?? []
  const myParticipation: Participation | undefined = participates.find(
    participate => participate.profileId === user?.id,
  )

  const [selectedCells, setSelectedCells] = useState(new Set<string>())
  const [allSelectedCells, setAllSelectedCells] = useState<{ [key: string]: Set<string> }>({})
  const [isResultView, setIsResultView] = useState<boolean>(true)
  const [resultCellCount, setResultCellCount] = useState<{ [key: string]: number }>({})
  const [maximumCount, setMaximumCount] = useState(1)
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false)
  const [cellSelectedNames, setCellSelectedNames] = useState<string[]>([])
  const [isHostView, setIsHostView] = useState(false)

  const [resultCells, setResultCells] = useState(new Set<string>())

  useEffect(() => {
    if (!eventData) return
    if (router.query.view === 'host') {
      setIsResultView(false)
      setIsHostView(true)
      return
    }
    setIsResultView(router.query.view === 'my' ? false : true)
    setIsHostView(false)
  }, [router.query.view, eventData])

  const isHost = eventData && eventData.profileId === user?.id

  useEffect(() => {
    const myCells = (myParticipation?.selectedCells ?? '').split(',')
    setSelectedCells(new Set(myCells))
  }, [myParticipation])

  useEffect(() => {
    if (!eventData || !router.query.id) return
    const counts = participates.reduce<{ [key: string]: number }>((accu, curr) => {
      if (curr.profileId === user?.id) return accu
      const selectedCells = (curr?.selectedCells ?? '').split(',')
      setAllSelectedCells(prev => ({ ...prev, [curr.profile.name]: new Set(selectedCells) }))
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
      if (counts[cellId]) {
        counts[cellId] += 1
        if (counts[cellId]! > maximumCount) {
          setMaximumCount(counts[cellId] as number)
        }
      } else counts[cellId] = 1
    })
    setResultCellCount(counts)
  }, [isResultView, eventData, selectedCells])

  function deselectAll() {
    setSelectedCells(new Set<string>([]))
    if (!router.query.id || !user?.id) return
  }

  function addOneCell(cellId: string) {
    if (isHost && isHostView) {
      setResultCells(prev => new Set([...prev, cellId]))
      return
    }
    setSelectedCells(prev => new Set([...prev, cellId]))
  }

  function removeOneCell(cellId: string) {
    if (isHost && isHostView) {
      console.log('@@@@', cellId, resultCells)
      setResultCells(prev => new Set([...prev].filter(x => x !== cellId)))
      return
    }
    setSelectedCells(prev => new Set([...prev].filter(x => x !== cellId)))
  }

  function addOrRemoveOneCell(cellId: string) {
    if (isHost && isHostView) {
      if (resultCells.has(cellId)) removeOneCell(cellId)
      else addOneCell(cellId)
      return
    }
    if (selectedCells.has(cellId)) removeOneCell(cellId)
    else addOneCell(cellId)
  }

  function handleCellSelect(cellIds: string[], isDelete?: boolean) {
    if (cellIds.length === 1) {
      if (cellIds?.[0]) addOrRemoveOneCell(cellIds[0])
      return
    }
    if (isDelete) {
      if (isHost && isHostView) {
        cellIds.forEach(id => {
          if (resultCells.has(id)) removeOneCell(id)
        })
        return
      }
      cellIds.forEach(id => {
        if (selectedCells.has(id)) removeOneCell(id)
      })
      return
    }

    if (isHost && isHostView) {
      setResultCells(prev => new Set([...prev, ...cellIds]))
      return
    }
    setSelectedCells(prev => new Set([...prev, ...cellIds]))
  }

  function switchToResult() {
    router.push(
      {
        pathname: '/events/[id]',
        query: {
          id: router.query.id,
        },
      },
      `/events/${router.query.id}`,
      { shallow: true },
    )
  }

  function switchToMySelects() {
    router.push(
      {
        pathname: '/events/[id]',
        query: {
          id: router.query.id,
          view: 'my',
        },
      },
      `/events/${router.query.id}?view=my`,
      { shallow: true },
    )
  }

  function switchToHostSelects() {
    router.push(
      {
        pathname: '/events/[id]',
        query: {
          id: router.query.id,
          view: 'host',
        },
      },
      `/events/${router.query.id}?view=host`,
      { shallow: true },
    )
  }

  function handleCellClickInResultView(cellId: string) {
    const names = Object.keys(allSelectedCells).filter(name => {
      if (allSelectedCells[name]?.has(cellId)) return true
      return false
    })
    if (selectedCells.has(cellId) && user?.name) names.push(user.name)
    setCellSelectedNames(names)
  }

  function renderButtons() {
    if (isResultView) {
      if (!isHost) {
        return (
          <div className="fixed bottom-4 w-full px-5 md:max-w-sm mx-auto flex flex-col justify-end">
            <button onClick={switchToMySelects} className="btn w-full text-white bg-gradient-to-r from-from to-to">
              내 시간 선택하기
            </button>
          </div>
        )
      }
      return (
        <div className="fixed bottom-4 w-full px-5 md:max-w-sm mx-auto flex justify-between">
          <button onClick={switchToMySelects} className="btn w-[48%]  text-white bg-gradient-to-r from-from to-to">
            내 시간 선택하기
          </button>
          <button onClick={switchToHostSelects} className="btn w-[48%] text-base-100  bg-textLightGray ">
            시간 확정하기
          </button>
        </div>
      )
    }
    if (isHostView) {
      return (
        <div className="fixed bottom-4 w-full px-5 md:max-w-sm mx-auto flex justify-between">
          <button onClick={switchToResult} className="btn w-[48%] text-base-100  bg-textLightGray">
            취소
          </button>
          <button
            onClick={() => setIsConfirmModalShown(true)}
            className="btn w-[48%] text-white bg-gradient-to-r from-from to-to"
          >
            확인
          </button>
        </div>
      )
    }
    return (
      <div className="fixed bottom-4 w-full px-5 md:max-w-sm mx-auto flex justify-between">
        <button onClick={deselectAll} className="btn w-[48%] text-base-100  bg-textLightGray">
          다시 선택 (초기화)
        </button>
        <button
          onClick={() => setIsConfirmModalShown(true)}
          className="btn w-[48%] text-white bg-gradient-to-r from-from to-to"
        >
          시간 선택 완료
        </button>
      </div>
    )
  }

  return (
    <>
      {isLoginModalShown && <LoginModal redirectUrl={router.query.asPath as string} />}
      {isConfirmModalShown && (
        <ConfirmModal
          text={isHostView ? '선택한 시간으로 약속을 확정할까요?' : undefined}
          onClose={() => setIsConfirmModalShown(false)}
          onOk={isHostView ? updateResultCells : updateSelectedCells}
        />
      )}

      <TopTitleBottomBtnLayout
        title={isResultView ? '시간 선택하기 (합계)' : '시간 선택하기'}
        classNames="px-0 h-screen relative overflow-hidden"
        customBtns={renderButtons()}
        onBackBtnClick={
          isResultView
            ? () => router.replace({ pathname: '/invites/[id]', query: { id: router.query.id } })
            : () => router.back(router.asPath.split('?')[0])
        }
      >
        <>
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
              <div className="w-full h-4/5">
                <TimeSelectTable
                  startingTimes={eventData?.startingTimes?.split(',')?.map(timestamp => Number(timestamp) * 1000) ?? []}
                  timeInterval={eventData?.timeInterval ? eventData.timeInterval * 1000 : undefined}
                  timeSize={eventData?.timeSize ? eventData.timeSize * 1000 : 60 * 60 * 6 * 1000}
                  selectedIds={selectedCells}
                  onSelect={handleCellSelect}
                  onSelectEnd={() => {}}
                  isResultView={isResultView}
                  resultCellCount={resultCellCount}
                  maximumCount={maximumCount}
                  onCellClick={handleCellClickInResultView}
                  isHostView={isHostView}
                  resultIds={resultCells}
                />
                {isResultView && cellSelectedNames?.length ? (
                  <div className="flex flex-col w-full px-5 mt-2">
                    <div className="text-xs text-textGray2">이 시간을 선택한 사람들</div>
                    <div className="flex overflow-auto mt-2">
                      {cellSelectedNames.map(name => (
                        <div className="badge shrink-0 mr-2 py-3 px-2 text-xs bg-base-100 border-none text-textGray2">
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </>
      </TopTitleBottomBtnLayout>
    </>
  )
}
