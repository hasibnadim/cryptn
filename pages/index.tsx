import { Button } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import Field from '../components/field'
import Overview from '../components/field/Overview'
import WebLayout from '../components/WebLayout'
import { useStateValue } from '../service/Store'

const Home = () => {
  const { query } = useRouter()
  const [{ user }] = useStateValue()
  const getTab = () => {
    if (query.tab === 'field') return <Field />
    else return <Overview />
  }
  return (
    <div className="container mx-auto h-max dark:bg-slate-900 dark:text-slate-50 ">
      <Head>
        <title>Home</title>
      </Head>

      <div className={`flex items-center  justify-end shadow bg-transparent ${!user.isLogin && !user.loading  && query.tab!=='field' &&'absolute container'}`}>
        <Link href={'/?tab=overview'}>
          <a className="rounded-b p-1 font-sans text-xs hover:bg-blue-400 md:p-2">
            Overview
          </a>
        </Link>
        <Link href={'/?tab=field'}>
          <a className="rounded-b p-1 font-sans text-xs hover:bg-blue-400 md:p-2">
            Community
          </a>
        </Link>
      </div>

      <div>{getTab()}</div>
    </div>
  )
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>
}
export default Home
