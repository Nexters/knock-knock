import { useRef } from 'react'

interface Props {
  selectedIds: Set<string>
  onSelect: (ids: string[], isDelete?: boolean) => void
  isResultView: boolean
  resultString: string[]
}

export default function TimeSelectTable({ selectedIds, onSelect, isResultView, resultString }: Props) {
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

  function handleSelectStart(e: any) {
    if (isSelectingRef.current) return
    const { col, row } = e.target.dataset
    if (!col || !row) return
    isSelectingRef.current = true
    const cellId = `${col}-${row}`
    const isDelete = selectedIds.has(cellId)
    selectStartCoors.current = { col, row, isDelete }
    prevCellRef.current = cellId
    onSelect([`${col}-${row}`])
  }

  // TODO: RAF
  function handleWhileSelect(e: any) {
    if (!isSelectingRef.current) return
    const { col, row } = e.target.dataset
    if (!col || !row) return
    const cellId = `${col}-${row}`
    if (prevCellRef.current === cellId) return
    prevCellRef.current = cellId

    const smallerCol = Math.min(col, selectStartCoors.current?.col ?? col)
    const biggerCol = Math.max(col, selectStartCoors.current?.col ?? col)
    const smallerRow = Math.min(row, selectStartCoors.current?.row ?? row)
    const biggerRow = Math.max(row, selectStartCoors.current?.row ?? row)

    const cellIds = []

    for (let col = smallerCol; col <= biggerCol; col++) {
      for (let row = smallerRow; row <= biggerRow; row++) {
        cellIds.push(`${col}-${row}`)
      }
    }

    onSelect(cellIds, selectStartCoors.current?.isDelete ?? false)
  }

  // TODO: RAF
  function handleWhileSelectTouch(e: any) {
    if (!isSelectingRef.current) return
    const documentTouchMoveX = e.changedTouches[e.changedTouches.length - 1].clientX
    const documentTouchMoveY = e.changedTouches[e.changedTouches.length - 1].clientY
    const targetCell = document.elementFromPoint(documentTouchMoveX, documentTouchMoveY) as HTMLDivElement
    const dataset = targetCell?.dataset
    if (!dataset) return
    const { col, row } = dataset
    if (!col || !row) return
    const cellId = `${col}-${row}`
    if (prevCellRef.current === cellId) return
    prevCellRef.current = cellId

    const smallerCol = Math.min(Number(col), selectStartCoors.current?.col ?? Number(col))
    const biggerCol = Math.max(Number(col), selectStartCoors.current?.col ?? Number(col))
    const smallerRow = Math.min(Number(row), selectStartCoors.current?.row ?? Number(row))
    const biggerRow = Math.max(Number(row), selectStartCoors.current?.row ?? Number(row))

    const cellIds = []

    for (let col = smallerCol; col <= biggerCol; col++) {
      for (let row = smallerRow; row <= biggerRow; row++) {
        cellIds.push(`${col}-${row}`)
      }
    }

    onSelect(cellIds, selectStartCoors.current?.isDelete ?? false)
  }

  function handleSelectEnd() {
    isSelectingRef.current = false
  }

  // 왜 별다른 Pointer Capturing 없이 이렇게 release 만 해도 잘 되는지 모르겠지만 일단 되니까 사용
  function handleSelectPointerLeave(e: any) {
    if (!isSelectingRef.current) return
    cellsWrapperRef.current?.releasePointerCapture(e.pointerId)
    isSelectingRef.current = false
  }

  function renderColors(col: number, row: number): string {
    const resultNumber = resultString?.[col]?.[row]
    if (!resultNumber || !Number(resultNumber)) return ''
    const colors = ['', '#a7f3d0', '#6ee7b7', '#059669']
    if (typeof Number(resultNumber) !== 'number') return ''
    //@ts-ignore
    return colors[resultNumber]
  }

  return (
    <div ref={wrapperRef} className="relative flex w-full max-h-full overflow-auto" style={{ touchAction: 'none' }}>
      <div className="w-16 flex-shrink-0 flex-grow-0 sticky left-0 z-10">
        <div
          onDrag={() => false}
          onPointerDown={handleDragStartForScroll}
          onPointerMove={handleDragForScroll}
          onPointerLeave={handleDragEndForScroll}
          onPointerCancel={handleDragEndForScroll}
          onPointerUp={handleDragEndForScroll}
          className=" bg-white "
        >
          <div className="h-6 flex-shrink-0 border-r first:border-t"></div>
          <div className="h-6 flex-shrink-0 border-r first:border-t"></div>

          {[...Array(22)].map((_e, i2) => (
            <div key={i2} className="h-7 flex-shrink-0 border-r first:border-t last:border-b relative select-none">
              {i2 % 2 === 0 ? (
                <span className="absolute left-5 -top-3">{`${9 + i2 / 2}`.padStart(2, '0')}시</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div ref={cellsWrapperRef} onPointerLeave={handleSelectPointerLeave} className="flex-grow flex">
        {[...Array(5)].map((_e, coloumnNumber) => (
          <div key={coloumnNumber} className="flex flex-col flex-shrink-0 flex-grow-0 w-1/4">
            <div
              onPointerDown={handleDragStartForScroll}
              onPointerMove={e => handleDragForScroll(e, false)}
              onPointerLeave={handleDragEndForScroll}
              onPointerCancel={handleDragEndForScroll}
              onPointerUp={handleDragEndForScroll}
              className="bg-white sticky top-0"
            >
              <div className="flex-shrink-0 flex-grow-0 h-6 border-t border-r text-center select-none font-bold">
                {`${3 + coloumnNumber}`.padStart(2, '0')}
              </div>
              <div className="flex-shrink-0 flex-grow-0 h-6 border-b border-r text-center select-none text-sm">
                {'월화수목금토일'.split('')[coloumnNumber % 7]}
              </div>
            </div>

            <div
              onPointerDown={isResultView ? undefined : handleSelectStart}
              onMouseMove={isResultView ? undefined : handleWhileSelect}
              onTouchMove={isResultView ? undefined : handleWhileSelectTouch}
              onPointerUp={isResultView ? undefined : handleSelectEnd}
            >
              {[...Array(22)].map((_e, rowNumber) => (
                <div
                  key={`${coloumnNumber}-${rowNumber}`}
                  data-col={coloumnNumber}
                  data-row={rowNumber}
                  className="flex-shrink-0 flex-grow-0 h-7 border-b border-r odd:border-dashed last-of-type:border-solid"
                  style={{
                    borderRight: '1px solid black',
                    backgroundColor: isResultView
                      ? renderColors(coloumnNumber, rowNumber) || 'white'
                      : selectedIds.has(`${coloumnNumber}-${rowNumber}`)
                      ? 'green'
                      : 'white',
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
