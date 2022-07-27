export default function Profile() {
  return (
    <div className="flex flex-col py-5 pt-4 relative h-screen bg-bgColor overflow-auto">
      <div className="flex itmes-center justify-between mt-5 px-5">
        <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer" />
        <img src="/assets/svg/Edit_outlined.svg" alt="icon" className="cursor-pointer" />
      </div>

      <div className="flex flex-col items-center justify-center mt-7">
        <img className="w-[130px]" src="/assets/images/image 6.png" alt="profile" />
        <div className="flex mt-5">
          <div className="badge badge-lg badge-neutral mr-2">디자이너</div>
          <div className="badge badge-lg badge-neutral mr-2">Enfj</div>
        </div>
        <span className="text-4xl font-bold mt-5">김희원</span>
        <span className="text-center text-textGray max-w-[250px] mt-5">
          안녕하세요. 넥스터즈 어쩌구 저쩌구 안녕안녕 뼈찜먹고싶습니다. 커피챗해요
        </span>
      </div>

      <div className="flex justify-between items-center px-5 overflow-auto mt-10">
        <h2 className="text-lg font-bold text-textGray">이때 가장 여유로워요!</h2>
        <button className="text-sm text-textGray">더보기</button>
      </div>
      <div className="flex mt-5 px-5">
        <div className="badge badge-lg badge-success mr-2">월요일</div>
        <div className="badge badge-lg badge-success mr-2">화요일</div>
        <div className="badge badge-lg badge-success mr-2">수요일</div>
      </div>

      <div className="flex pl-5 mt-5 overflow-auto">
        <div className="w-[160px] h-[160px] bg-cardBg rounded-lg flex flex-col items-center justify-center mr-3">
          <img className="w-[70px]" src="/assets/images/badge1.png" alt="badge" />
          <span className="text-sm text-textGray mt-1">[넥스터즈]</span>
          <span className="font-bold mt-3">이달의 약속왕</span>
        </div>
        <div className="w-[160px] h-[160px] bg-cardBg rounded-lg flex flex-col items-center justify-center mr-3">
          <img className="w-[70px]" src="/assets/images/badge1.png" alt="badge" />
          <span className="text-sm text-textGray mt-1">[넥스터즈]</span>
          <span className="font-bold mt-3">이달의 약속왕</span>
        </div>
        <div className="w-[160px] h-[160px] bg-cardBg rounded-lg flex flex-col items-center justify-center">
          <img className="w-[70px]" src="/assets/images/badge1.png" alt="badge" />
          <span className="text-sm text-textGray mt-1">[넥스터즈]</span>
          <span className="font-bold mt-3">이달의 약속왕</span>
        </div>
      </div>
      <button className="btn btn-primary mx-5 mt-10">약속 요청하기</button>
    </div>
  )
}
