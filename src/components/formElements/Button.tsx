import { ReactNode } from 'react'
import { cls } from '../../utils/cls'

interface Props {
  children: ReactNode
  classNames?: string
  [key: string]: any
}

export default function Button({ children, onClick, classNames, ...rest }: Props) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls('btn w-full mt-5 bg-gradient-to-r from-from to-to text-white', classNames ?? '')}
    >
      {children}
    </button>
  )
}
