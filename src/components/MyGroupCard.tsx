type TMyGroup = {
  title: string
  numOfPeople: number
}

type MyGroupProps = {
  data: TMyGroup
}

const MyGroupCard = ({ data }: MyGroupProps) => {
  return (
    <div className="flex items-center justify-between bg-cardBg p-3 rounded-lg mt-2">
      <div className="flex items-center">
        <div className="font-bold">{data.title}</div>
        <div className="ml-2 text-xs text-textGray">참여 {data.numOfPeople}명</div>
      </div>
      <img src="assets/svg/right.svg" alt="logo" />
    </div>
  )
}

export default MyGroupCard
