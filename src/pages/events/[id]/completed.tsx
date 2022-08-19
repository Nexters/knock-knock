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
        <div className="text-center mb-8 text-lg w-full">
          시간 선택을 완료했어요.
          <br />
          약속장이 만날 시간을 결정할 거예요!
        </div>
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
      <div className="fixed bottom-10 w-full px-5 flex justify-between">
        <button
          onClick={() => router.push({ pathname: '/invites/[id]', query: { id: router.query.id as string } })}
          className="btn w-[48%] btn-primary text-base-100 bg-whiteGray"
        >
          초대장으로
        </button>
        <button onClick={onCopyToClipboard} className="btn w-[48%] btn-primary text-white">
          링크 공유
        </button>
      </div>
    </div>
  )
}
