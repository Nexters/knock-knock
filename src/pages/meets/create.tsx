import { useState } from 'react'
import Calendar from 'react-calendar'

function Create() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [value, onChange] = useState(new Date())

  const toggleCalendar = () => {
    setShowCalendar(prevShow => !prevShow)
  }

  return (
    <section className="flex flex-col items-center bg-bgColor h-screen pt-[1.625rem] pr-[1.25rem] pb-[1.625rem] pl-[1.25rem] overflow-auto">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">약속 제목</span>
        </label>
        <input
          type="text"
          placeholder="10자 이내로 작성해주세요"
          className="input input-bordered w-full max-w-xs bg-[#2F3035] border-none"
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">약속 설명</span>
        </label>
        <input
          type="text"
          placeholder="30자 이내로 작성해주세요"
          className="input input-bordered w-full max-w-xs bg-[#2F3035] border-none"
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">카테고리</span>
        </label>
        <select className="select select-bordered bg-[#2F3035] border-none">
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
        <select className="select select-bordered bg-[#2F3035] border-none" onClick={toggleCalendar}>
          {/*<option disabled selected>*/}
          {/*  카테고리를 선택해주세요*/}
          {/*</option>*/}
          {/*<option>밥약</option>*/}
          {/*<option>커피약</option>*/}
          {/*<option>술약</option>*/}
          {/*<option>모각코</option>*/}
        </select>
      </div>
      {showCalendar && <Calendar onChange={onChange} value={value} locale={'ko-KR'} />}
      <button className="btn btn-primary btn-wide w-full max-w-xs mt-[2.625rem]">완료</button>
    </section>
  )
}

export default Create
