import React, { useRef } from 'react'
import { useClickAway } from 'react-use'
import BackDrop from 'src/components/BackDrop'

interface GuideProps {
  onClose: () => void
}

function GuideModal({ onClose }: GuideProps) {
  const carouselContainerRef = useRef(null)
  useClickAway(carouselContainerRef, onClose)

  return (
    <>
      <BackDrop classNames="z-20" />
      <div className="fixed w-full h-full md:max-w-sm z-30">
        <div ref={carouselContainerRef} className="w-[80%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="carousel w-[100%] h-[100%]">
            <div id="slide1" className="carousel-item relative w-full flex flex-col">
              <img className="w-[100%] h-[100%] z-40" src="assets/images/clock.png" alt="시계" />
              <div className="absolute top-[60%] w-full h-[40%] z-50 flex flex-col items-center justify-center rounded-bl-lg rounded-br-lg">
                <p className="relative text-[1.125rem] leading-[1.6875rem]">
                  <span className="bg-accent-content">플러스 버튼</span>을 눌러
                  <img
                    className="absolute -top-4 -left-4 w-[20px] h-[20px]"
                    src="/assets/images/floating.svg"
                    alt="플러스버튼"
                  />
                </p>
                <p className="text-[1.125rem] leading-[1.6875rem]">새로운 약속을 생성하고 공유해요!</p>
              </div>
              <div className="absolute left-1/2 bottom-[1.25rem] -translate-x-1/2 z-50">
                <a
                  href="#slide1"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#D9D9D9] before:leading-[1.25rem] before:mr-[0.5rem]"
                ></a>
                <a
                  href="#slide2"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#5D5E62] before:leading-[1.25rem] before:mr-[0.5rem]"
                ></a>
                <a
                  href="#slide3"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#5D5E62] before:leading-[1.25rem]"
                ></a>
              </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full flex flex-col">
              <img className="w-[100%] h-[100%] z-40" src="/assets/images/time_table.png" alt="시간표" />
              <div className="absolute top-[60%] w-full h-[40%] z-50 flex flex-col items-center justify-center rounded-bl-lg rounded-br-lg">
                <p className="text-[1.125rem] leading-[1.6875rem]">내가 가능한 약속 시간을</p>

                <p className="text-[1.125rem] leading-[1.6875rem]">
                  <span className="bg-[#28D899]">시간표에서 선택</span>해요!
                </p>
              </div>
              <div className="absolute left-1/2 bottom-[1.25rem] -translate-x-1/2 z-50">
                <a
                  href="#slide1"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#5D5E62] before:leading-[1.25rem] before:mr-[0.5rem]"
                ></a>
                <a
                  href="#slide2"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#D9D9D9] before:leading-[1.25rem] before:mr-[0.5rem]"
                ></a>
                <a
                  href="#slide3"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#5D5E62] before:leading-[1.25rem]"
                ></a>
              </div>
            </div>

            <div id="slide3" className="carousel-item relative w-full flex flex-col">
              {/*<div className="relative w-full h-[60%] bg-[#2F3035]"></div>*/}
              <img className="w-[100%] h-[100%] z-40" src="assets/images/talk.png" alt="토크" />
              <div className="absolute top-[60%] w-full h-[40%] z-50 flex flex-col items-center justify-center rounded-bl-lg rounded-br-lg">
                <p className="text-[1.125rem] leading-[1.6875rem]">
                  약속장이 <span className="bg-[#28D899]">확정 시간</span>을
                </p>
                <p className="text-[1.125rem] leading-[1.6875rem]">결정하면 약속 만들기 끝!</p>
              </div>

              <div className="absolute left-1/2 bottom-[1.25rem] -translate-x-1/2 z-50">
                <a
                  href="#slide1"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#5D5E62] before:leading-[1.25rem] before:mr-[0.5rem]"
                ></a>
                <a
                  href="#slide2"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#5D5E62] before:leading-[1.25rem] before:mr-[0.5rem]"
                ></a>
                <a
                  href="#slide3"
                  className="before:inline-block before:w-[0.375rem] before:h-[0.375rem] before:rounded-full before:bg-[#D9D9D9] before:leading-[1.25rem]"
                ></a>
              </div>
            </div>
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

export default GuideModal
