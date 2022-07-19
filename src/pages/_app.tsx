import { withTRPC } from '@trpc/next'
import type { AppRouter } from '../server/router'
import superjson from 'superjson'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { getBaseUrl } from '../utils/url'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="w-full h-screen bg-slate-100">
        <main className="w-full max-w-[360px] h-screen mx-auto bg-white text-black">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
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