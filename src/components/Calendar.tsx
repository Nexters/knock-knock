import ReactCalendar from 'react-calendar'

const dateAlreadyClicked = (dates: Date[], date: Date) => dates.some(d => d.getTime() === date.getTime())
const datesExcept = (dates: Date[], date: Date) => dates.filter(d => d.getTime() !== date.getTime())

interface Props {
  dates: Date[]
  onDatesUpdate: (dates: Date[]) => void
}

export default function Calendar({ dates, onDatesUpdate }: Props) {
  const onClickDay = (date: Date) => {
    // if day is already clicked, remove it from state
    if (dateAlreadyClicked(dates, date)) onDatesUpdate(datesExcept(dates, date))
    else onDatesUpdate([...dates, date])
  }

  const tileClassName = ({ date }: { date: Date }) => {
    const classNames: string[] = ['dayTile']
    // give active days a special class
    if (dateAlreadyClicked(dates, date)) return ['activeDay', ...classNames]
    return classNames
  }

  const tileDisabled = ({ date, view }: { date: Date; view: any }) => {
    if (view === 'month') {
      if (date.getTime() < Date.now()) return true
    }
    return false
  }

  return (
    <ReactCalendar tileClassName={tileClassName} onClickDay={onClickDay} locale={'en'} tileDisabled={tileDisabled} />
  )
}
