interface Props {
  onClose: () => void
  children: React.ReactNode
  isBackground?: boolean
}

const BottomSheet = ({ onClose, children, isBackground = true }: Props) => {
  return (
    <>
      <div
        className="w-full h-['100vh'] absolute top-0 bottom-0 left-0 right-0 bg-bgColor bg-opacity-50 cursor-pointer z-40"
        onClick={onClose}
      />
      <div
        className={`w-full h-fit flex flex-col items-center absolute bottom-0 ${
          isBackground && 'bg-white'
        } rounded-t-2xl px-5 pt-3 pb-6 z-50`}
      >
        {children}
      </div>
    </>
  )
}

export default BottomSheet
