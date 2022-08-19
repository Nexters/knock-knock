import { useCustomRouter } from 'src/shared/hooks'

interface Props {
  title: string
  onBackBtnClick?: () => void
}

export default function TitleHeader({ title, onBackBtnClick }: Props) {
  const router = useCustomRouter()

  return (
    <div className="fixed w-full md:max-w-sm bg-bgColor top-0 pb-4 z-20">
      <button type="button" onClick={onBackBtnClick ?? (() => router.back())} className="absolute top-10 left-5 ">
        <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer left-0 text-whiteGray" />
      </button>
      <h1 className="mt-10 text-xl font-bold text-whiteGray text-center ">{title}</h1>
    </div>
  )
}
