import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { useStateValue } from '../../service/Store'
import WebLayout from '../../components/WebLayout'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { CircularProgress, IconButton } from '@mui/material'
import AccountInfo from '../../components/Profile/AccountInfo'
import Tabtitle from '../../components/Profile/Tabtitle'
import Peoples from '../../components/Profile/tabBody/Peoples'
import Messages from '../../components/Profile/tabBody/Messages'
import Wallet from '../../components/Profile/tabBody/Wallet'
import style from '../../components/Profile/style.module.css'
import Worning from '../../components/Profile/tabBody/Worning'

const Profile = () => {
  const [{ user }] = useStateValue()
  const {
    query: { tab },
    push,
  } = useRouter()

  useEffect(() => {
    if (!user.loading && !user.isLogin) {
      push({
        pathname: '/login',
        query: { warningmsg: 'Your might login first.' },
      })
    }
  }, [user.name, user.loading])

  const getTabBody = () => {
    if (tab === 'peoples') return <Peoples />
    else if (tab === 'messages') return <Messages />
    else return <Wallet />
  }
  return (
    <div className=" h-full">
      <Head>
        <title>{user.name || 'Profile'}</title>
      </Head>

      {user.loading && !user.isLogin ? (
        <div className="mt-20  flex flex-col items-center justify-center">
          <CircularProgress color="success" disableShrink />
          <span>Please Wait ...</span>
        </div>
      ) : (
        <div className="container mx-auto h-full md:flex">
          <AccountInfo user={user} />
          <div className="w-full py-2 px-1 md:px-2 lg:m-2">
            <div className="flex items-end justify-between ">
              <IconButton>
                <SettingsIcon fontSize="small" color="info" />
              </IconButton>
              <IconButton>
                <NotificationsIcon fontSize="small" color="info" />
              </IconButton>
            </div>
            <>
              <Tabtitle />
              <Worning />
              <div className={style.body_container}>{getTabBody()}</div>
            </>
          </div>
        </div>
      )}
    </div>
  )
}
Profile.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>
}
export default Profile
