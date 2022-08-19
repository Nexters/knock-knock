import format from 'date-fns/format'
import set from 'date-fns/set'

export function unixTimeToDate(unixTime: string | undefined): Date {
  return new Date(Number(unixTime) * 1000)
}

export function startingTimesToDates(startingTimes: string | undefined): Date[] {
  if (!startingTimes) return []
  return startingTimes.split(',').map(startingTime => {
    return unixTimeToDate(startingTime)
  })
}

export function dateToFormattedString(date: Date | undefined): string {
  if (!date) return ''
  return format(date, 'yyyy.MM.dd')
}

export function setZeroHoursMinutes(date: Date): Date {
  return set(date, { hours: 0, minutes: 0 })
}

export function getFormattedTimeString(date: Date | undefined): string {
  if (!date) return ''
  return format(date, 'HH:mm')
}

export function getCanlendarText(dates: Date[]): string {
  if (!dates.length) return ''
  if (dates.length === 1) return dateToFormattedString(dates[0])
  return `${dateToFormattedString(dates[0])} 외 ${dates.length - 1}일`
}
