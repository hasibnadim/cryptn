import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import React, { useEffect } from 'react'
import Dashbord from '../../components/Profile/Dashbord'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useStateValue } from '../../service/Store'
import Wallet from '../../components/Profile/Wallet'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let weather = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Rajshahi&appid=9a0c0149c84f4fbb789d2bf64faefd61'
  )
  weather = await weather.json()

  return {
    props: { weather },
  }
}

const Profile: NextPage = ({
  weather,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { pathname, query } = router
  const [{ user }] = useStateValue()

  useEffect(() => {
    if (!user.loading && !user.name) {
      router.push({
        pathname: '/login',
        query: { warningmsg: 'Your might login first.' },
      })
    }
  }, [user.name, user.loading])
  return (
    <div className="min-h">
      <Head>
        <title>{user.name || 'Profile'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user.loading && !user.name ? (
        <h1>Loading</h1>
      ) : (
        <div className="container mx-auto md:flex">
          <div className="flex min-w-max items-center p-4 text-center shadow md:flex-col md:shadow-none">
            <img src={user.photoUrl} className="rounded-full md:w-40" />
            <div className="px-4 md:px-0">
              <p className="w-max text-2xl lg:text-3xl">{user.name}</p>
              <p className="w-max">{user.email}</p>
            </div>
          </div>
          <div className="w-full py-2 md:px-2 lg:m-2">
            <ul className="flex w-full justify-between">
              <li
                className="tab"
                onClick={() =>
                  router.replace({
                    pathname,
                    query: { ...query, tab: 'dashbord' },
                  })
                }
              >
                <DashboardIcon />
                <span className="px-2">Dashbord</span>
              </li>
              <li
                className="tab"
                onClick={() =>
                  router.replace({
                    pathname,
                    query: { ...query, tab: 'wallet' },
                  })
                }
              >
                <AccountBalanceWalletIcon />
                <span className="px-2">Wallet</span>
              </li>
            </ul>
            <div className="rounded-b-xl p-1 shadow-md md:p-3">
              {(query.tab === 'dashbord' || query.tab === undefined) && (
                <Dashbord weather={weather} />
              )}
              {query.tab === 'wallet' && <Wallet />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile
