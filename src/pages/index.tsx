import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col p-5 pt-9 relative h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-extrabold">노크노크</h1>
        <span className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>

      <div className="mt-5">
        <div className="card bg-slate-300 rounded-xl">
          <div className="card-body p-4 relative">
            <div>
              <div className="avatar items-center">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
                <div className="ml-3">김태우</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="badge badge-accent">태그를 등록해주세요</div>
            </div>
          </div>
          <span className="absolute right-4 top-4 text-white p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">약속 모임</h2>
          <span className="text-sm">더보기</span>
        </div>

        <div className="mt-2 flex overflow-visible">
          <div className="card bg-slate-400 rounded-xl min-w-[190px] inline-flex flex-shrink-0">
            <div className="card-body p-4 px-3 text-white relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="badge badge-primary text-2xs">밥약</div>
                  <div className="badge badge-secondary ml-1 text-2xs">넥스터즈</div>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </span>
              </div>

              <h3 className="mt-3 font-bold">일이삼사오육칠팔구십</h3>
              <div className="text-m">강소현 외 3명</div>
              <div className="mt-6 text-xs">
                <div>07월 24일 외 3일</div>
                <div>마감일 D-5</div>
              </div>

              <span className="absolute right-4 bottom-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="card bg-slate-400 rounded-xl min-w-[190px] inline-flex flex-shrink-0 ml-3">
            <div className="card-body p-4 px-3 text-white relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="badge badge-primary text-2xs">밥약</div>
                  <div className="badge badge-secondary ml-1 text-2xs">넥스터즈</div>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </span>
              </div>

              <h3 className="mt-3 font-bold">일이삼사오육칠팔구십</h3>
              <div className="text-m">강소현 외 3명</div>
              <div className="mt-6 text-xs">
                <div>07월 24일 외 3일</div>
                <div>마감일 D-5</div>
              </div>

              <span className="absolute right-4 bottom-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-9">
        <div className="flex itmes-center justify-between">
          <h2 className="text-lg font-bold">내 그룹</h2>
          <Link href="/createGroup">
            <a className="flex items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <div className="ml-1">새 그룹 만들기</div>
            </a>
          </Link>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between bg-slate-200 p-3 rounded-lg">
            <div className="font-bold">[공식] NEXTERS</div>
            <div className="text-xs">참여 235명</div>
          </div>
          <div className="flex items-center justify-between bg-slate-200 p-3 rounded-lg mt-1">
            <div className="font-bold">일이삼사오육칠팔구십</div>
            <div className="text-xs">참여 23명</div>
          </div>
        </div>
      </div>

      <button className="btn btn-circle fixed bottom-10 right-5 bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
