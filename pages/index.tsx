import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import Field from '../components/field'
import Header from '../components/Header'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let news = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=9e0accf7bc3b48818537bf7f5fcd4182'
  )
  news = await news.json()

  return {
    props: { news },
  }
}

const Home: NextPage = ({
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="h-full dark:bg-slate-900 dark:text-slate-50">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header User={{ name: 'nadim' }} />
      <Field News={news} />
    </div>
  )
}

export default Home
