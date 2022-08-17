import { ReactNode } from 'react'
import TitleHeader from '../TitleHeader'

interface Props {
  title: string
  btnText?: string
  onBottomBtnClick?: () => void
  onBackBtnClick?: () => void
  customBtns?: ReactNode
  children: ReactNode
}

export default function TopTitleBottomBtnLayout({
  title,
  btnText,
  onBackBtnClick,
  onBottomBtnClick,
  customBtns,
  children,
}: Props) {
  return (
    <div className="flex flex-col items-center bg-bgColor h-screen pt-24 px-5 pb-8 overflow-auto relative">
      <TitleHeader title={title} onBackBtnClick={onBackBtnClick} />
      {children}

      <div className="mt-11 w-full">
        {customBtns ?? (
          <button className="btn btn-primary w-full" onClick={onBottomBtnClick}>
            {btnText}
          </button>
        )}
      </div>
    </div>
  )
}
