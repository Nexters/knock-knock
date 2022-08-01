import Head from 'next/head'
import { withTRPC } from '@trpc/next'
import type { AppRouter } from '../server/router'
import superjson from 'superjson'
import '../styles/globals.css'
import '../styles/calendar.css'
import type { AppProps } from 'next/app'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { getBaseUrl } from '../utils/url'
import { SessionProvider } from 'next-auth/react'
import { UserContextProvider } from 'src/context/UserContext'
import { trpc } from 'src/utils/trpc'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { data } = trpc.useQuery(['users.me'])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <SessionProvider session={session}>
        <UserContextProvider value={data}>
          <div className="w-full h-screen bg-slate-100 overflow-auto">
            <main className="w-full md:max-w-sm h-screen mx-auto bg-bgColor text-white">
              <Component {...pageProps} />
            </main>
          </div>
          <ToastContainer
            position={toast.POSITION.TOP_CENTER}
            autoClose={1000}
            hideProgressBar={true}
            transition={Slide}
          />
        </UserContextProvider>
      </SessionProvider>
    </>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`

    const links = [
      // loggerLink(),
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
