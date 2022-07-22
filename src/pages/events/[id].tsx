import { useState } from 'react'
import TimeSelectTable from '../../components/TimeSelectTable'

export default function Event() {
  const [selectedCells, setSelectedCells] = useState(new Set<string>())

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

      <div className="mt-7 h-3/4">
        <TimeSelectTable selectedIds={selectedCells} onSelect={handleCellSelect} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-8">
        <button onClick={() => setSelectedCells(new Set<string>([]))} className="btn w-24">
          초기화
        </button>
        <button className="btn w-48 ml-3">결과 보기</button>
      </div>
    </div>
  )
}
