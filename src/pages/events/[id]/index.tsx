import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TimeSelectTable from 'src/components/TimeSelectTable'
import { useUserContext } from 'src/context/UserContext'

export default function Event() {
  const { status } = useSession()
  const { push, query } = useRouter()

  const user = useUserContext()
  console.log(user)

  const [selectedCells, setSelectedCells] = useState(new Set<string>())
  const [isResultView, setIsResultView] = useState<boolean>(false)
  const [resultString, setResultString] = useState<string[]>([
    '0033111222233330020110',
    '0000111222233331100110',
    '0111222233330000110000',
    '0000111222200030000110',
    '0000111222233330000110',
  ])

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
              onClick={() => push({ pathname: '/auth/login/anonymous', query: { redirect: query.id } })}
              className="block mx-auto btn w-full max-w-xs bg-primary text-white"
            >
              비회원 로그인
            </button>
            <button
              onClick={() => push({ pathname: '/api/auth/signin' })}
              className="block mx-auto btn w-full max-w-xs mt-2 bg-primary text-white"
            >
              SNS 계정으로 로그인
            </button>
            <button
              onClick={() => push({ pathname: '/' })}
              className="block mx-auto btn w-full max-w-xs mt-2 bg-primary text-white"
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-9 h-screen relative">
        <div className="flex justify-between px-5">
          <div className="text-sm select-none">날짜 선택</div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        <div className="mt-7 h-2/3">
          <TimeSelectTable
            selectedIds={selectedCells}
            onSelect={handleCellSelect}
            isResultView={isResultView}
            resultString={resultString}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-8">
          {isResultView ? (
            <button onClick={() => setIsResultView(!isResultView)} className="btn w-52">
              다시 선택하기
            </button>
          ) : (
            <>
              <button onClick={() => setSelectedCells(new Set<string>([]))} className="btn w-24">
                초기화
              </button>
              <button onClick={() => setIsResultView(!isResultView)} className="btn w-48 ml-3">
                결과 보기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
