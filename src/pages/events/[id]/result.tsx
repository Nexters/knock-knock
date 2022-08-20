import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Completed() {
  const router = useRouter()

  function onCopyToClipboard() {
    navigator.clipboard
      .writeText(`${window.location.origin}/invites/${router.query.id}`)
      .then(() => {
        toast.success('링크가 복사되었습니다.')
      })
      .catch(() => {
        toast.error('복사를 다시 시도해주세요.')
      })
  }

  return (
    <div className="flex flex-col pt-8 h-screen relative bg-bgColor">
      <div className="flex justify-between items-center ml-5">
        <Link href="/">
          <img src="/assets/svg/logo.svg" alt="logo" className="cursor-pointer" />
        </Link>
      </div>
      <div className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <div className="text-center mb-8 text-lg w-full">약속이 확정됐어요!</div>
        <video
          src="/assets/videos/inform.mp4"
          poster="/assets/images/inform.png"
          width="300"
          height="300"
          loop={true}
          autoPlay={true}
          muted={true}
        ></video>
      </div>
      <div className="fixed bottom-10 w-full px-5 flex justify-between md:max-w-sm">
        <button
          onClick={() => router.push({ pathname: '/' })}
          className="btn w-[48%] btn-primary text-base-100 bg-whiteGray"
        >
          홈으로
        </button>
        <button onClick={onCopyToClipboard} className="btn w-[48%] btn-primary text-white">
          링크 공유
        </button>
      </div>
    </div>
  )
}
