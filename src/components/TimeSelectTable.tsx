import { useRef, useState } from 'react'

interface Props {
  selectedIds: Set<string>
}

export default function TimeSelectTable({ selectedIds }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef({
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  })

  const [isDragging, setIsDragging] = useState<boolean>(false)

  function handleDragStartForScroll(e) {
    const target = wrapperRef.current
    if (!target) return
    setIsDragging(true)

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
    if (!isDragging) return
    const target = wrapperRef.current
    if (!target) return
    const clientX = e.clientX ?? e?.touches?.[0]?.clientX
    const clientY = e.clientY ?? e?.touches?.[0]?.clientY
    // console.log(clientX, clientY)
    const dx = clientX - scrollPositionRef.current.x
    const dy = clientY - scrollPositionRef.current.y
    // console.log(dx)
    if (isVerticalScroll) {
      target.scrollTop = scrollPositionRef.current.top - dy
      return
    }
    const updatedScrollLeft = scrollPositionRef.current.left - dx
    console.log(updatedScrollLeft)
    if (updatedScrollLeft < 0) return
    target.scrollLeft = scrollPositionRef.current.left - dx
  }

  function handleDragEndForScroll(e) {
    setIsDragging(false)
  }

  function selectStart(e) {
    console.log(e.target.dataset)
  }

  return (
    <div ref={wrapperRef} className="flex w-full h-96 overflow-auto">
      <div
        onMouseDown={handleDragStartForScroll}
        onMouseMove={handleDragForScroll}
        onMouseUp={handleDragEndForScroll}
        onMouseLeave={handleDragEndForScroll}
        onTouchStart={handleDragStartForScroll}
        onTouchMove={handleDragForScroll}
        onTouchEnd={handleDragEndForScroll}
        className="w-16 flex-shrink-0 flex-grow-0">
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>

        {[...Array(30)].map((_e, i2) => (
          <div key={i2} className="h-7 flex-shrink-0 border-r first:border-t last:border-b relative select-none">
            {i2 % 2 === 0 ? <span className="absolute left-5 -top-3">{`${9 + i2 / 2}`.padStart(2, '0')}시</span> : null}
          </div>
        ))}
      </div>

      <div
        onMouseDown={handleDragStartForScroll}
        onMouseMove={e => handleDragForScroll(e, false)}
        onMouseUp={handleDragEndForScroll}
        onMouseLeave={handleDragEndForScroll}
        onTouchStart={handleDragStartForScroll}
        onTouchMove={e => handleDragForScroll(e, false)}
        onTouchEnd={handleDragEndForScroll}
        className="flex-grow flex">
        {[...Array(5)].map((_e, coloumnNumber) => (
          <div key={coloumnNumber} className="flex flex-col flex-shrink-0 w-1/4">
            <div>
              <div className="flex-shrink-0 h-6 border-t border-r"></div>
              <div className="flex-shrink-0 h-6 border-b border-r"></div>
            </div>

            <div onMouseDown={selectStart}>
              {[...Array(30)].map((_e, rowNumber) => (
                <div
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
