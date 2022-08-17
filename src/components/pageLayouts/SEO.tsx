import Head from 'next/head'

type SEO = {
  children: JSX.Element
  title?: string | undefined
  description?: string
  keywords?: string
  image?: string
  url?: string
}

function SEO({ children, title, description, image, keywords, url }: SEO): JSX.Element {
  const basicConfig = {
    title: '우리가 만날 시간은? 노크노크!',
    siteTitle: 'Knock Knock',
    description: '쉽고 빠르게 약속을 만들어봐요!',
    url: 'https://www.knockknock.co.kr/',
    image: 'https://user-images.githubusercontent.com/60738400/184473499-d14ec4f3-7617-461f-bdf8-b9e6649e10e3.png',
    keywords: `약속, 노크노크, 넥스터즈, 모임, 만남, 약속 생성, 커피챗, 개발자, 디자이너, 쉽다, 빠르다`,
  }

  return (
    <>
      <Head>
        {/* basic */}
        <title>{`${basicConfig.siteTitle} | ${title ?? basicConfig.title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <meta charSet="utf-8" />
        <meta name="description" content={basicConfig.description} />
        <meta name="keywords" content={`${basicConfig.keywords}, ${keywords ? keywords : ''}`} />

        {/* open graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${basicConfig.siteTitle} | ${title ?? basicConfig.title}`} />
        <meta property="og:description" content={basicConfig.description} />
        <meta property="og:site_name" content={basicConfig.siteTitle} />
        <meta property="og:url" content={url ? `${basicConfig.url}${url}` : basicConfig.url} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image" content={image ?? basicConfig.image} />

        {/* twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={`${basicConfig.siteTitle} | ${title ?? basicConfig.title}`} />
        <meta property="twitter:url" content={url ? `${basicConfig.url}${url}` : basicConfig.url} />
        <meta property="twitter:description" content={description ?? basicConfig.description} />
        <meta name="twitter:site" content={basicConfig.url} />
        <meta name="twitter:image" content={image ?? basicConfig.image} />

        <link rel="icon" href={`${basicConfig.url}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basicConfig.url}/favicon.ico`} />
        <meta property="og:image" content={image ?? basicConfig.image} />
        <link rel="canonical" href={url ? `${basicConfig.url}${url}` : basicConfig.url} />
      </Head>
      {children}
    </>
  )
}

export default SEO
