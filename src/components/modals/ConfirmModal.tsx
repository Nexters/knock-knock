import BackDrop from '../BackDrop'

interface Props {
  onOk: () => void
  onClose: () => void
  text?: string
}

export default function ConfirmModal({ onClose, onOk, text }: Props) {
  return (
    <>
      <BackDrop />
      <div className="w-full h-screen md:max-w-sm fixed mx-auto z-50">
        <div className="w-[80%] absolute top-1/2 -translate-y-1/2 bg-base-100 pt-9 pb-6 px-6 rounded-xl left-1/2 -translate-x-1/2 ">
          <h3 className="font-bold text-base text-center">{text ?? '선택한 시간을 저장할까요?'}</h3>
          <div className="flex-col mt-6">
            <button onClick={onOk} className="block mx-auto btn w-full mt-2 bg-primary text-white">
              예
            </button>
            <button
              onClick={onClose}
              className="block mx-auto btn w-full mt-2 bg-neutral hover:bg-opacity-30 text-white"
            >
              아니요
            </button>
          </div>
          <div className="absolute left-1/2 bottom-[-3.25rem] -translate-x-1/2">
            <button className="w-[2.5rem] h-[2.5rem] bg-[#46474C] rounded-full cursor-pointer" onClick={onClose}>
              X
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
