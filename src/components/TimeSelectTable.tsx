import { useRef } from 'react'

interface Props {
  selectedIds: Set<string>
  onSelect: (ids: string[], isDelete?: boolean) => void
  onSelectEnd: () => void
  isResultView: boolean
  resultCellCount: { [key: string]: number }
  startingTimes: number[]
  timeInterval?: number
  timeSize: number
  maximumCount?: number
  onCellClick?: (cellId: string) => void
}

export default function TimeSelectTable({
  selectedIds,
  onSelect,
  onSelectEnd,
  isResultView,
  resultCellCount,
  timeSize,
  timeInterval = 30 * 60 * 1000,
  startingTimes = [],
  maximumCount = 1,
  onCellClick,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cellsWrapperRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const scrollPositionRef = useRef({
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  })
  const isSelectingRef = useRef<boolean>(false)
  const selectStartCoors = useRef<{ row: number; col: number; isDelete: boolean }>()
  const prevCellRef = useRef<string>()

  const columnsCount = startingTimes.length
  const rowsCount = Math.floor(timeSize / timeInterval)
  const startingHours = new Date(startingTimes[0] ?? Date.now()).getHours()
  const startingMinutes = new Date(startingTimes[0] ?? Date.now()).getMinutes()
  const isOddLabelStart = startingMinutes ? 1 : 0

  const cellIds = new Array(rowsCount).fill(0).map(() => new Array(columnsCount))
  for (let col = 0; col < columnsCount; col++) {
    for (let row = 0; row < rowsCount; row++) {
      cellIds[row]![col] = String((startingTimes[col]! + timeInterval * row) / 1000)
    }
  }

  function handleDragStartForScroll(e: any) {
    const target = wrapperRef.current
    if (!target) return
    isDraggingRef.current = true

    const clientX = e.clientX ?? e?.touches?.[0]?.clientX
    const clientY = e.clientY ?? e?.touches?.[0]?.clientY
    scrollPositionRef.current = {
      left: target.scrollLeft,
      top: target.scrollTop,
      // Mouse or touch position
      x: clientX,
      y: clientY,
    }
  }

  // TODO: RAF 사용
  function handleDragForScroll(e: any, isVerticalScroll = true) {
    if (!isDraggingRef.current) return
    const target = wrapperRef.current
    if (!target) return
    const clientX = e.clientX ?? e?.touches?.[0]?.clientX
    const clientY = e.clientY ?? e?.touches?.[0]?.clientY

    const dx = clientX - scrollPositionRef.current.x
    const dy = clientY - scrollPositionRef.current.y

    if (isVerticalScroll) {
      target.scrollTop = scrollPositionRef.current.top - dy
      return
    }
    const updatedScrollLeft = scrollPositionRef.current.left - dx

    if (updatedScrollLeft < 0) return
    target.scrollLeft = scrollPositionRef.current.left - dx
  }

  function handleDragEndForScroll() {
    isDraggingRef.current = false
  }

  function handleCellClick(e: any) {
    const { col, row } = e.target.dataset
    if (!col || !row) return
    const cellId = cellIds[row]![col]
    onCellClick?.(cellId)
  }

  function handleSelectStart(e: any) {
    if (isSelectingRef.current) return
    const { col, row } = e.target.dataset
    if (!col || !row) return
    isSelectingRef.current = true
    const cellId = cellIds[row]![col]
    const isDelete = selectedIds.has(cellId)
    selectStartCoors.current = { col, row, isDelete }
    prevCellRef.current = cellId
    onSelect([cellIds[row]![col]])
  }

  // TODO: RAF
  function handleWhileSelect(e: any) {
    if (!isSelectingRef.current) return
    const { col, row } = e.target.dataset
    if (!col || !row) return
    const cellId = cellIds[row]![col]
    if (prevCellRef.current === cellId) return
    prevCellRef.current = cellId

    const smallerCol = Math.min(col, selectStartCoors.current?.col ?? col)
    const biggerCol = Math.max(col, selectStartCoors.current?.col ?? col)
    const smallerRow = Math.min(row, selectStartCoors.current?.row ?? row)
    const biggerRow = Math.max(row, selectStartCoors.current?.row ?? row)

    const selectedCellIds = []

    for (let col = smallerCol; col <= biggerCol; col++) {
      for (let row = smallerRow; row <= biggerRow; row++) {
        selectedCellIds.push(cellIds[row]![col])
      }
    }

    onSelect(selectedCellIds, selectStartCoors.current?.isDelete ?? false)
  }

  // TODO: RAF
  function handleWhileSelectTouch(e: any) {
    if (!isSelectingRef.current) return
    const documentTouchMoveX = e.changedTouches[e.changedTouches.length - 1].clientX
    const documentTouchMoveY = e.changedTouches[e.changedTouches.length - 1].clientY
    const targetCell = document.elementFromPoint(documentTouchMoveX, documentTouchMoveY) as HTMLDivElement
    const dataset = targetCell?.dataset
    if (!dataset) return
    const { col, row, time } = dataset
    if (!col || !row || !time) return
    const cellId = time
    if (prevCellRef.current === cellId) return
    prevCellRef.current = cellId

    const smallerCol = Math.min(Number(col), selectStartCoors.current?.col ?? Number(col))
    const biggerCol = Math.max(Number(col), selectStartCoors.current?.col ?? Number(col))
    const smallerRow = Math.min(Number(row), selectStartCoors.current?.row ?? Number(row))
    const biggerRow = Math.max(Number(row), selectStartCoors.current?.row ?? Number(row))

    const selectedCellIds = []

    for (let col = smallerCol; col <= biggerCol; col++) {
      for (let row = smallerRow; row <= biggerRow; row++) {
        selectedCellIds.push(cellIds[row]![col])
      }
    }

    onSelect(selectedCellIds, selectStartCoors.current?.isDelete ?? false)
  }

  function handleSelectEnd() {
    isSelectingRef.current = false
    onSelectEnd()
  }

  // 왜 별다른 Pointer Capturing 없이 이렇게 release 만 해도 잘 되는지 모르겠지만 일단 되니까 사용
  function handleSelectPointerLeave(e: any) {
    if (!isSelectingRef.current) return
    cellsWrapperRef.current?.releasePointerCapture(e.pointerId)
    isSelectingRef.current = false
  }

  function renderColors(cellId: string): string {
    const resultNumber = Number(resultCellCount[cellId])
    if (!resultNumber) return '#18191F'
    if (typeof resultNumber !== 'number') return '#18191F'
    //@ts-ignore
    // return colors[resultNumber]
    const step = Number((0.7 / maximumCount).toFixed(2))

    return isResultView
      ? `rgba(22, 198, 116, ${0.2 + step * resultNumber})`
      : selectedIds.has(cellId)
      ? '#16C674'
      : `rgba(47, 48, 53, ${0.2 + step * resultNumber})`
  }

  return (
    <div
      ref={wrapperRef}
      className="relative flex w-full max-h-full overflow-auto text-textGray2"
      style={{ touchAction: 'none' }}
    >
      <div className="w-16 flex-shrink-0 flex-grow-0 sticky left-0 z-10">
        <div
          onDrag={() => false}
          onPointerDown={handleDragStartForScroll}
          onPointerMove={handleDragForScroll}
          onPointerLeave={handleDragEndForScroll}
          onPointerCancel={handleDragEndForScroll}
          onPointerUp={handleDragEndForScroll}
          className="bg-bgColor"
        >
          <div className="h-6 flex-shrink-0 border-r first:border-t border-[#474747]"></div>
          <div className="h-6 flex-shrink-0 border-r first:border-t border-[#474747]"></div>

          {[...Array(rowsCount)].map((_e, i2) => (
            <div
              key={i2}
              className="h-6 flex-shrink-0 border-r first:border-t last:border-b border-[#474747] relative select-none"
            >
              {i2 % 2 === isOddLabelStart ? (
                <span className="absolute left-5 -top-2 text-xs">
                  {`${startingHours + Math.ceil(i2 / 2)}`.padStart(2, '0')}시
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div ref={cellsWrapperRef} onPointerLeave={handleSelectPointerLeave} className="flex-grow flex">
        {startingTimes.map((startingTime, coloumnNumber) => (
          <div
            key={coloumnNumber}
            className="flex flex-col flex-shrink-0 flex-grow-0 w-1/4"
            style={{ width: columnsCount > 4 ? '24%' : `${100 / columnsCount}%` }}
          >
            <div
              onPointerDown={handleDragStartForScroll}
              onPointerMove={e => handleDragForScroll(e, false)}
              onPointerLeave={handleDragEndForScroll}
              onPointerCancel={handleDragEndForScroll}
              onPointerUp={handleDragEndForScroll}
              className="bg-bgColor sticky top-0"
            >
              <div className="h-6 flex-shrink-0 flex-grow-0 border-t border-r text-center select-none text-sm font-bold pt-1 border-[#474747]">
                {`${`${new Date(startingTime).getMonth() + 1}`.padStart(2, '0')}.${`${new Date(
                  startingTime,
                ).getDate()}`.padStart(2, '0')}`}
              </div>
              <div className="h-6 flex-shrink-0 flex-grow-0 border-b border-r text-center select-none text-xs pb-1 border-[#474747]">
                {'일월화수목금토'[new Date(startingTime).getDay()]}
              </div>
            </div>

            <div
              onPointerDown={isResultView ? handleCellClick : handleSelectStart}
              onMouseMove={isResultView ? undefined : handleWhileSelect}
              onTouchMove={isResultView ? undefined : handleWhileSelectTouch}
              onPointerUp={isResultView ? undefined : handleSelectEnd}
            >
              {[...Array(rowsCount)].map((_e, rowNumber) => (
                <div
                  key={String((startingTime + rowNumber * timeInterval) / 1000)}
                  data-col={coloumnNumber}
                  data-row={rowNumber}
                  data-time={(startingTime + rowNumber * timeInterval) / 1000}
                  className="flex-shrink-0 flex-grow-0 h-6 border-b border-r odd:border-dashed last-of-type:border-solid border-[#474747]"
                  style={{
                    borderRight: '1px solid #474747',
                    borderColor: '#474747',
                    backgroundColor: renderColors(String((startingTime + rowNumber * timeInterval) / 1000)),
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
