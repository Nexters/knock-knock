import { ReactNode } from 'react'
import TitleHeader from '../TitleHeader'

interface Props {
  title: string
  btnText: string
  onBtnClick: () => void
  children: ReactNode
}

export default function TopTitleBottomBtnLayout({ title, btnText, onBtnClick, children }: Props) {
  return (
    <div className="flex flex-col items-center bg-bgColor h-screen pt-24 px-5 pb-8 overflow-auto relative">
      <TitleHeader title={title} />
      {children}

      <div className="mt-11 w-full">
        <button className="btn btn-primary w-full" onClick={onBtnClick}>
          {btnText}
        </button>
      </div>
    </div>
  )
}
