function Group() {
  return (
    <section className="flex flex-col items-center bg-base-200 h-screen">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">그룹</span>
        </label>
        <select className="select select-bordered">
          <option disabled selected>
            그룹을 선택해주세요
          </option>
          <option>없음</option>
          <option>넥스터즈</option>
          <option>모임2</option>
          <option>모임3</option>
          <option>모임4</option>
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">약속 제목</span>
        </label>
        <input type="text" placeholder="10자 이내로 작성해주세요" className="input input-bordered w-full max-w-xs" />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">카테고리</span>
        </label>
        <select className="select select-bordered">
          <option disabled selected>
            카테고리를 선택해주세요
          </option>
          <option>밥약</option>
          <option>술약</option>
          <option>커피챗</option>
          <option>정기모임</option>
          <option>나들이</option>
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">날짜</span>
        </label>
        <select className="select select-bordered">
          {/*<option disabled selected>*/}
          {/*  카테고리를 선택해주세요*/}
          {/*</option>*/}
          {/*<option>밥약</option>*/}
          {/*<option>커피약</option>*/}
          {/*<option>술약</option>*/}
          {/*<option>모각코</option>*/}
        </select>
      </div>

      <div className="w-full max-w-xs">
        <label className="label">
          <span className="label-text">모집 마감일</span>
        </label>
        <div className="flex justify-between items-center">
          <button className="btn btn-circle btn-outline">-</button>
          <span className="text-white">3일 뒤</span>
          <button className="btn btn-circle btn-outline">+</button>
        </div>
        <p className="text-center text-white">2022년 07월 05일</p>
      </div>

      <div className="form-control w-full max-w-xs flex justify-between">
        <label className="label cursor-pointer">
          <span className="label-text">이 모임을 그룹에 공개할래요</span>
          <input type="checkbox" className="checkbox" checked />
        </label>
      </div>

      <button className="btn btn-wide w-full max-w-xs bg-emerald-800">Wide</button>
    </section>
  )
}

export default Group
