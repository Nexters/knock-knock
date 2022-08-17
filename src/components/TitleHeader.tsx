import { useCustomRouter } from 'src/shared/hooks'

export default function TitleHeader({ title }: { title: string }) {
  const router = useCustomRouter()

  return (
    <div className="fixed w-full sm:max-w-sm bg-bgColor top-0 pb-4">
      <button onClick={() => router.back()} className="absolute top-9 left-5 ">
        <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer left-0" />
      </button>
      <h1 className="mt-8 text-xl font-bold text-white text-center ">{title}</h1>
    </div>
  )
}
