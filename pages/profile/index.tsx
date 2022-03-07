import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Todos from '../../components/Profile/Todos'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { useStateValue } from '../../service/Store'
import Wallet from '../../components/Profile/Wallet'

const Profile: NextPage = () => {
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
    <div>
      <Head>
        <title>{user.name || 'Profile'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {user.loading && !user.name ? (
        <h1>Loading</h1>
      ) : (
        <div className="container mx-auto md:flex">
          <div className="flex min-w-max items-center p-4 text-center shadow md:flex-col md:shadow-none">
            <img src={user.photoUrl} className="rounded-full md:w-40" />
            <div className="px-4 md:px-0">
              <p className="w-max text-3xl">{user.name}</p>
              <p className="w-max">{user.email}</p>
            </div>
          </div>
          <div className="m-2 w-full p-2">
            <ul className="flex w-full justify-between">
              <li
                className="tab"
                onClick={() =>
                  router.replace({
                    pathname,
                    query: { ...query, tab: 'todos' },
                  })
                }
              >
                <FormatListNumberedIcon />
                <span className="px-2">Todos</span>
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
            <div className="shadow-md p-3 rounded-b-lg">
              {(query.tab === 'todos' || query.tab === undefined) && <Todos />}
              {query.tab === 'wallet' && <Wallet />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile
