import { trpc } from "src/utils/trpc"

export default function Events() {
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])

  return (

  )
}
