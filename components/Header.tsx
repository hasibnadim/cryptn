import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import hstyle from '../styles/header.module.css'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import LoginIcon from '@mui/icons-material/Login'
import AppsIcon from '@mui/icons-material/Apps'
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import LogoutIcon from '@mui/icons-material/Logout'
import InfoIcon from '@mui/icons-material/Info'
import { CircularProgress, IconButton } from '@mui/material'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import CallSplitIcon from '@mui/icons-material/CallSplit';
import HistoryIcon from '@mui/icons-material/History';
import WebhookIcon from '@mui/icons-material/Webhook'
import { useStateValue } from '../service/Store'
import { getAuth, signOut } from 'firebase/auth'

export default function Header() {
  const auth = getAuth()
  const [themeTitle, setThemeTitle] = useState('Dark')
  const [{ siteName, user }, dispatch] = useStateValue()
  const [deferredPrompt, setDeferredPrompt] = useState<any>()
  const setupThem = () => {
    let theme = localStorage.getItem('_crtptheme')
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark')
      setThemeTitle('Light')
    }
    if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector('html')?.classList.add('dark')
      setThemeTitle('Light')
    }
  }

  const logOut = () => {
    if (confirm('Are you sure to Logout?')) {
      signOut(auth)
        .then((auth) => {
          dispatch({
            type: 'SET_USER',
            payload: {
              loading: false,
              isLogin: false,
              uid: '',
              token: '',
              name: '',
              email: '',
              photoUrl: '',
            },
          })
        })
        .catch((error) => {
          alert('LogOut Failed')
        })
    }
  }

  function toggleTheme() {
    let currentTheme =
      localStorage.getItem('_crtptheme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    if (currentTheme === 'dark') {
      document.querySelector('html')?.classList.remove('dark')
      setThemeTitle('Dark')
    } else {
      document.querySelector('html')?.classList.add('dark')
      setThemeTitle('Light')
    }
    localStorage.setItem(
      '_crtptheme',
      currentTheme === 'dark' ? 'light' : 'dark'
    )
  }
  const showInstallPromotion = () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(false)
      }
    })
  }
  useEffect(() => {
    setupThem()
    const deferredPromptfunc = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', deferredPromptfunc)
    return () => {
      window.removeEventListener('beforeinstallprompt', deferredPromptfunc)
    }
  }, [])

  var profileIcon = (
    <>
      {user.loading && (
        <IconButton>
          <CircularProgress size={'1.3rem'} />
        </IconButton>
      )}

      {!user.loading &&
        (user.isLogin ? (
          <Link href="/profile">
            <IconButton>
              <img src={user.photoUrl} className="w-6 rounded-full" />
            </IconButton>
          </Link>
        ) : (
          <Link href="/login">
            <IconButton>
              <LoginIcon />
            </IconButton>
          </Link>
        ))}
    </>
  )
  return (
    <header className={hstyle.header}>
      <nav>
        <Link href="/">
          <span className="brand_name">{siteName}</span>
        </Link>
        <div>
          <Link href="/">
            <IconButton>
              <BlurCircularOutlinedIcon />
            </IconButton>
          </Link>

          {profileIcon}

          {/* App list design */}
          <IconButton className={hstyle.app_btn}>
            <AppsIcon />
          </IconButton>
          <ul className={hstyle.app_list}>
            <Link href="/todos">
              <li className="dark:text-black">
                <FormatListNumberedIcon />
                <span className="text-xs">Todos</span>
              </li>
            </Link>
            <Link href="/hevent">
            <li className="dark:text-black">
              <HistoryIcon />
              <span className="text-xs whitespace-pre">H Event</span>
            </li>
            </Link>
            <li className="dark:text-black">
              <CallSplitIcon />
              <span className="text-xs">Incident</span>
            </li>
          </ul>
          {/* App list design */}

          <IconButton aria-label="option" className={hstyle.option_btn}>
            <ArrowDropDownCircleIcon />
          </IconButton>

          <ul className={hstyle.option_list}>
            {deferredPrompt && (
              <li
                className="flex items-center dark:text-black"
                onClick={showInstallPromotion}
              >
                <span>
                  <WebhookIcon />
                </span>
                <span className="mx-auto ">Add App</span>
              </li>
            )}

            <Link href={'/about'}>
              <li className="flex items-center dark:text-black">
                <span>
                  <InfoIcon />
                </span>
                <span className="mx-auto">About Us</span>
              </li>
            </Link>
            <li
              onClick={toggleTheme}
              className="flex items-center dark:text-black"
            >
              <span>
                <Brightness6Icon />
              </span>
              <span className="mx-auto">{themeTitle}</span>
            </li>

            {user?.name && (
              <li
                className="flex items-center dark:text-black"
                onClick={logOut}
              >
                <LogoutIcon />
                <span className="mx-auto">LogOut</span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
