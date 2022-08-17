import { cls } from 'src/utils/cls'

// z-index 값 등을 받아서 변경가능
export default function BackDrop({ classNames }: { classNames?: string }) {
  return (
    <div
      className={cls('fixed top-0 left-0 right-0 bottom-0 bg-black z-40 opacity-80 overflow-hidden', classNames ?? '')}
    />
  )
}
