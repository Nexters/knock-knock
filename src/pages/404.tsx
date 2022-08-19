import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex flex-col pt-8 h-screen relative bg-bgColor">
      <div className="flex justify-between items-center ml-5">
        <Link href="/">
          <img src="/assets/svg/logo.svg" alt="logo" className="cursor-pointer" />
        </Link>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <div className="text-center mb-8 text-lg">페이지가 없어요...</div>
        <video
          src="/assets/videos/404.mp4"
          poster="/assets/images/404.png"
          width="300"
          height="300"
          loop={true}
          autoPlay={true}
          muted={true}
        ></video>
      </div>
    </div>
  )
}
