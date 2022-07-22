interface Props {
  isDragging: boolean
  selectedIds: Set<string>
  onPointerOver: (id: string) => void
}

export default function TimeSelectTable({ isDragging, selectedIds, onPointerOver }: Props) {
  return (
    <div className="flex w-full h-3/4 overflow-auto">
      <div className="w-16 flex-shrink-0 flex-grow-0 select-none">
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>

        {[...Array(30)].map((_e, i2) => (
          <div key={i2} className="h-7 flex-shrink-0 border-r first:border-t last:border-b relative">
            {i2 % 2 === 0 ? <span className="absolute left-5 -top-3">{`${9 + i2 / 2}`.padStart(2, '0')}시</span> : null}
          </div>
        ))}
      </div>

      <div className="flex-grow flex" style={{ touchAction: 'none' }} onDragStart={() => false}>
        {[...Array(5)].map((_e, i) => (
          <div key={i} className="flex flex-col flex-shrink-0 w-1/4">
            <div>
              <div className="h-6 border-t border-r"></div>
              <div className="h-6 border-b border-r"></div>
            </div>

            {[...Array(30)].map((_e, i2) => (
              <div
                key={i2}
                data-id={`${i}-${i2}`}
                className="flex-shrink-0 h-7 border-b border-r even:border-dashed last-of-type:border-solid"
                style={{
                  borderRight: '1px solid',
                  backgroundColor: selectedIds.has(`${i}-${i2}`) ? 'green' : 'white',
                }}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
