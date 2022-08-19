import { useRef } from 'react'
import { useClickAway } from 'react-use'
import BackDrop from './BackDrop'

interface Props {
  onClose: (e: Event) => void
  children: React.ReactNode
  isBackground?: boolean
}

const BottomSheet = ({ onClose, children, isBackground = true }: Props) => {
  const ref = useRef(null)
  useClickAway(ref, onClose)

  return (
    <>
      <BackDrop />
      <div
        ref={ref}
        className={`w-full h-fit flex flex-col items-center fixed md:max-w-sm bottom-0 ${
          isBackground && 'bg-white'
        } rounded-t-2xl px-5 pt-3 pb-6 z-50`}
      >
        {children}
      </div>
    </>
  )
}

export default BottomSheet
