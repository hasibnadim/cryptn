import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import Field from '../components/field'
import WebLayout from '../components/WebLayout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let news = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=9e0accf7bc3b48818537bf7f5fcd4182'
  )
  news = await news.json()

  return {
    props: { news },
  }
}

const Home = ({
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="min-h dark:bg-slate-900 dark:text-slate-50">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Field News={news} />
    </div>
  )
}
Home.getLayout=function getLayout(page:ReactElement){
  return (
    <WebLayout>
      {page}
    </WebLayout>
  )
}
export default Home
