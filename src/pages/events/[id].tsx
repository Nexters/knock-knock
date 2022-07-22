import { useState } from 'react'
import TimeSelectTable from '../../components/TimeSelectTable'

export default function Event() {
  const [selectedCells, setSelectedCells] = useState(new Set<string>())

  function addCell(cellId: string) {
    setSelectedCells(prev => new Set([...prev, cellId]))
  }

  function removeCell(cellId: string) {
    setSelectedCells(prev => new Set([...prev].filter(x => x !== cellId)))
  }

  function addOrRemoveCell(cellId: string) {
    if (selectedCells.has(cellId)) removeCell(cellId)
    else addCell(cellId)
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
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <div className="mt-7 h-full">
        <TimeSelectTable selectedIds={selectedCells} />
      </div>

      <div className="absolute bottom-0 w-full flex justify-center mb-9">
        <button className="btn w-24">초기화</button>
        <button className="btn w-48 ml-3">결과 보기</button>
      </div>
    </div>
  )
}
