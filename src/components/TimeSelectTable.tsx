import { useRef } from 'react'
import styles from '../styles/TimeSelectTable.module.css'

export default function TimeSelectTable() {
  // const wrapperRef = useRef<HTMLDivElement>(null)

  // const horizontalScrollbarHeight = wrapperRef.current
  //   ? wrapperRef.current.offsetHeight - wrapperRef.current.clientHeight
  //   : 0

  return (
    <div className="flex w-full mb-5">
      <div className="w-14 flex-shrink-0 flex-grow-0 border-r border-t border-b">
        <div className="h-6"></div>
        <div className="h-6"></div>
        <div className="h-6"></div>
        <div className="h-6"></div>
        <div className="h-6"></div>
        <div className="h-6"></div>
        <div className="h-6"></div>
        <div className="h-6"></div>
      </div>

      <div className="flex-grow flex overflow-x-auto">
        <div className="flex flex-col flex-shrink-0 w-1/4 border-r">
          <div className="h-6 border-t"></div>
          <div className="h-6 border-b"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
        </div>
        <div className="flex flex-col flex-shrink-0 w-1/4 border-r">
          <div className="h-6 border-t"></div>
          <div className="h-6 border-b"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
        </div>
        <div className="flex flex-col flex-shrink-0 w-1/4 border-r">
          <div className="h-6 border-t"></div>
          <div className="h-6 border-b"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
        </div>
        <div className="flex flex-col flex-shrink-0 w-1/4 border-r">
          <div className="h-6 border-t"></div>
          <div className="h-6 border-b"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
        </div>
        <div className="flex flex-col flex-shrink-0 w-1/4 border-r">
          <div className="h-6 border-t"></div>
          <div className="h-6 border-b"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
          <div className="h-6 border-b odd:border-dashed"></div>
        </div>
      </div>
    </div>
  )
}
