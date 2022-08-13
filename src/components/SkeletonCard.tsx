import React from 'react'

type SkeletonProps = {
  isWideView?: boolean
}

function Skeleton({ isWideView }: SkeletonProps) {
  return (
    <div className={`shadow rounded-xl p-4 min-w-[190px] min-h-[${isWideView ? '162px' : '100px'}] mt-3 bg-cardBg`}>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-darkGray h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-darkGray rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-darkGray rounded col-span-2"></div>
              <div className="h-2 bg-darkGray rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-darkGray rounded"></div>
          </div>
          {isWideView && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-darkGray rounded col-span-2"></div>
                <div className="h-2 bg-darkGray rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-darkGray rounded"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Skeleton
