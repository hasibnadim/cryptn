import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name="application-name" content="Cryptn" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/cl192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
