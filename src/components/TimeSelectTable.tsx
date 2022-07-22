export default function TimeSelectTable() {
  return (
    <div className="flex w-full h-3/4 overflow-auto">
      <div className="w-16 flex-shrink-0 flex-grow-0">
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>
        <div className="h-6 flex-shrink-0 border-r first:border-t"></div>

        {[...Array(48)].map((_e, i2) => (
          <div key={i2} className="h-7 flex-shrink-0 border-r first:border-t last:border-b relative">
            {i2 % 2 === 0 ? <span className="absolute left-5 -top-3">00시</span> : null}
          </div>
        ))}
      </div>

      <div className="flex-grow flex">
        {[...Array(5)].map((_e, i) => (
          <div key={i} className="flex flex-col flex-shrink-0 w-1/4">
            <div>
              <div className="h-6 border-t border-r"></div>
              <div className="h-6 border-b border-r"></div>
            </div>

            {[...Array(48)].map((_e, i2) => (
              <div
                key={i2}
                className="flex-shrink-0 h-7 border-b border-r even:border-dashed last-of-type:border-solid"
                style={{ borderRight: '1px solid' }}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
