import React from 'react'
import Weather from './Weather'
import InProccessTodo from './InProccessTodo'
import TodaysEvent from './TodaysEvent'
import { useStateValue } from '../../service/Store'
import Banner from '../about/Banner'
import Link from 'next/link'
import { Button } from '@mui/material'

const Overview = () => {
  const [{ user, siteName }] = useStateValue()
  return (
    <div>
      {!user.isLogin && !user.loading && (
        <>
          <Banner />
          <p className="p-5 text-center">
            {siteName} is a multi services platform.
          </p>
          <Link href={'/about'}>
            <a className="block p-2 text-center">
              <Button variant="outlined" size="large">
                Read More
              </Button>
            </a>
          </Link>
        </>
      )}
      <Weather />
      <InProccessTodo />
      <TodaysEvent />
    </div>
  )
}

export default Overview
