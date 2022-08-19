import { ReactNode } from 'react'
import { cls } from 'src/utils/cls'
import TitleHeader from '../TitleHeader'

interface Props {
  title: string
  btnText?: string
  onBottomBtnClick?: () => void
  onBackBtnClick?: () => void
  customBtns?: ReactNode
  classNames?: string
  children: ReactNode
}

export default function TopTitleBottomBtnLayout({
  title,
  btnText,
  onBackBtnClick,
  onBottomBtnClick,
  customBtns,
  classNames,
  children,
}: Props) {
  return (
    <div
      className={cls(
        'flex flex-col items-center bg-bgColor pt-24 px-5 pb-8 overflow-auto relative',
        classNames ? classNames : '',
      )}
    >
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
