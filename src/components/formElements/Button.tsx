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
      className={cls(
        'w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
        classNames ?? '',
      )}>
      {children}
    </button>
  )
}
