import Header from '../components/Header'

function ProfilePage() {
  return (
    <section>
      <Header />
      <div className="flex flex-col items-center">
        <img src="https://placeimg.com/192/192/people" alt="프로필" />
        <div className="flex mt-5">
          <span className="p-2 bg-slate-300 rounded-xl">디자이너</span>
          <span className="p-2 ml-1 bg-slate-300 rounded-xl">ENFJ</span>
        </div>
        <h1 className="text-3xl mt-2">김희원</h1>
        <p className="mt-2">
          만나서 반갑습니다. 김희원입니다.
          <br />
          만나서 반갑습니다. 김희원입니다.
        </p>
      </div>
    </section>
  )
}

export default ProfilePage
