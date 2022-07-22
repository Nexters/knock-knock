import { useEffect, useState } from 'react'
import TimeSelectTable from '../../components/TimeSelectTable'

export default function Event() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedCells, setSelectedCells] = useState(new Set<string>())

  // console.log(selectedCells)

  function addCell(cellId: string) {
    setSelectedCells(prev => new Set([...prev, cellId]))
  }

  function removeCell(cellId: string) {
    setSelectedCells(prev => new Set([...prev].filter(x => x !== cellId)))
  }

  function addOrRemoveCell(cellId: string) {
    console.log(selectedCells)
    console.log(selectedCells.has(cellId), cellId, 'check')
    if (selectedCells.has(cellId)) removeCell(cellId)
    else addCell(cellId)
  }

  useEffect(() => {
    const handlePointerOver = e => {
      console.log(e.target.dataset?.['id'])
      addOrRemoveCell(e.target.dataset?.['id'])
    }
    const handlePointerCancel = () => console.log('canceled')
    const handlePointerDown = e => {
      addOrRemoveCell(e.target.dataset?.['id'])
      document.addEventListener('pointerover', handlePointerOver)
    }
    const handlePointerUp = () => document.removeEventListener('pointerover', handlePointerOver)

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerCancel)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointercancel', handlePointerCancel)
    }
  }, [])

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
        <TimeSelectTable isDragging={isDragging} selectedIds={selectedCells} onPointerOver={addOrRemoveCell} />
      </div>

      <div className="absolute bottom-0 w-full flex justify-center mb-9">
        <button className="btn w-24">초기화</button>
        <button className="btn w-48 ml-3">결과 보기</button>
      </div>
    </div>
  )
}
