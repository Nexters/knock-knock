import Head from 'next/head'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  seoTitle?: string
}

export default function CenteringLayout({ children, seoTitle }: Props) {
  return (
    <>
      <Head>
        <title>{seoTitle || '노크노크'}</title>
      </Head>
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden text-center">
        {children}
      </div>
    </>
  )
}
