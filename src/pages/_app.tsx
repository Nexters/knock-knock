import '../styles/globals.css'
import superjson from 'superjson'
import type { AppRouter } from '../server/router'
import { withTRPC } from '@trpc/next'
import { AppProps } from 'next/app'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { trpc } from '../utils/trpc'
import { UserContextProvider } from '../context/UserContext'
import { getBaseUrl } from '../utils/url'

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(['users.me'])

  if (isLoading) {
    return <>Loading user...</>
  }

  return (
    <UserContextProvider value={data}>
      <div className="w-full h-screen bg-slate-100">
        <main className="w-full max-w-lg h-screen mx-auto bg-white">
          <Component {...pageProps} />
        </main>
      </div>
    </UserContextProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req)
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false,
})(MyApp)
