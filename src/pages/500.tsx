import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Custom500() {
  const router = useRouter()

  return (
    <div className="flex flex-col pt-8 h-screen relative bg-bgColor">
      <div className="flex justify-between items-center ml-5">
        <Link href="/">
          <img src="/assets/svg/logo.svg" alt="logo" className="cursor-pointer" />
        </Link>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <div className="text-center mb-8 text-lg">
          문제가 발생했어요!
          <br />
          메인 홈으로 이동해주세요
        </div>
        <video
          src="/assets/videos/error.mp4"
          poster="/assets/images/error.png"
          width="300"
          height="300"
          loop={true}
          autoPlay={true}
          muted={true}
        ></video>
      </div>
      <div className="fixed bottom-10 w-full px-5">
        <button onClick={() => router.push('/')} className="btn w-full btn-primary text-white">
          홈으로
        </button>
      </div>
    </div>
  )
}
