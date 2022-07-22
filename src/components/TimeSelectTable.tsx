import { useRef } from 'react'

interface Props {
  selectedIds: Set<string>
  onSelect: (ids: string[]) => void
}

export default function TimeSelectTable({ selectedIds, onSelect }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef({
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  })
  const isSelectingRef = useRef<boolean>(false)
  const isDraggingRef = useRef<boolean>(false)

  function handleDragStartForScroll(e) {
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
  function handleDragForScroll(e, isVerticalScroll = true) {
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

  function handleDragEndForScroll(e) {
    isDraggingRef.current = false
  }

  function handleSelectStart(e) {
    if (isSelectingRef.current) return
    const { col, row } = e.target.dataset
    if (!col || !row) return
    isSelectingRef.current = true
    onSelect([`${col}-${row}`])
  }

  function handleWhileSelect(e) {
    if (!isSelectingRef.current) return
    console.log(e)
  }

  function handleSelectEnd(e) {}

  return (
    <div ref={wrapperRef} className="flex w-full h-3/4 overflow-auto">
      <div
        onPointerDown={handleDragStartForScroll}
        onPointerMove={handleDragForScroll}
        onPointerLeave={handleDragEndForScroll}
        onPointerCancel={handleDragEndForScroll}
        onPointerUp={handleDragEndForScroll}
        onPointerOut={handleDragEndForScroll}
        className="w-16 flex-shrink-0 flex-grow-0">
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>

        {[...Array(30)].map((_e, i2) => (
          <div key={i2} className="h-7 flex-shrink-0 border-r first:border-t last:border-b relative select-none">
            {i2 % 2 === 0 ? <span className="absolute left-5 -top-3">{`${9 + i2 / 2}`.padStart(2, '0')}시</span> : null}
          </div>
        ))}
      </div>

      <div className="flex-grow flex">
        {[...Array(5)].map((_e, coloumnNumber) => (
          <div key={coloumnNumber} className="flex flex-col flex-shrink-0 w-1/4">
            <div
              onPointerDown={handleDragStartForScroll}
              onPointerMove={e => handleDragForScroll(e, false)}
              onPointerLeave={handleDragEndForScroll}
              onPointerCancel={handleDragEndForScroll}
              onPointerUp={handleDragEndForScroll}
              onPointerOut={handleDragEndForScroll}>
              <div className="flex-shrink-0 h-6 border-t border-r"></div>
              <div className="flex-shrink-0 h-6 border-b border-r"></div>
            </div>

            <div>
              {[...Array(30)].map((_e, rowNumber) => (
                <div
                  onPointerDown={handleSelectStart}
                  onPointerMove={handleWhileSelect}
                  // onMouseMove={handleWhileSelect}
                  onMouseUp={handleSelectEnd}
                  onMouseLeave={handleSelectEnd}
                  // onTouchMove={handleWhileSelect}
                  onTouchEnd={handleSelectEnd}
                  key={`${coloumnNumber}-${rowNumber}`}
                  data-col={coloumnNumber}
                  data-row={rowNumber}
                  className="flex-shrink-0 h-7 border-b border-r odd:border-dashed last-of-type:border-solid"
                  style={{
                    borderRight: '1px solid black',
                    backgroundColor: selectedIds.has(`${coloumnNumber}-${rowNumber}`) ? 'green' : 'white',
                  }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
