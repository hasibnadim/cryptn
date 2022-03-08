import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import hstyle from '../styles/header.module.css'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import LoginIcon from '@mui/icons-material/Login'
import AppsIcon from '@mui/icons-material/Apps'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import LogoutIcon from '@mui/icons-material/Logout'
import InfoIcon from '@mui/icons-material/Info'
import { IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import NoteIcon from '@mui/icons-material/Note'
import GroupIcon from '@mui/icons-material/Group'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import WorkIcon from '@mui/icons-material/Work'
import CreateIcon from '@mui/icons-material/Create'

import MessageIcon from '@mui/icons-material/Message'
import { useStateValue } from '../service/Store'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Header(): JSX.Element {
  const auth = getAuth()
  const [themeTitle, setThemeTitle] = useState('Dark')
  const [{ siteName, user }, dispatch] = useStateValue()
  const [newuser, loading, error] = useAuthState(auth)

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

  useEffect(() => {
    setupThem()
    if (!loading) {
      if (!error) {
        dispatch({
          type: 'SET_USER',
          payload: {
            loading: false,
            name: newuser?.displayName || '',
            email: newuser?.email || '',
            photoUrl: newuser?.photoURL || '',
          },
        })
      } else {
        dispatch({
          type: 'SET_USER',
          payload: {
            loading: false,
            name: '',
            email: '',
            photoUrl: '',
          },
        })
      }
    }
    // onAuthStateChanged(auth, (resuser) => {

    // })
  }, [newuser, error, loading])

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
  return (
    <header className={hstyle.header}>
      <nav>
        <Link href="/">
          <span className="brand_name">{siteName}</span>
        </Link>
        <div>
          <Link href="/">
            <IconButton>
              <TravelExploreIcon />
            </IconButton>
          </Link>
          {user?.name ? (
            <Link href="/profile">
              <IconButton>
                <img src={user?.photoUrl} className="w-6 rounded-full" />
              </IconButton>
            </Link>
          ) : (
            <Link href="/login">
              <IconButton>
                <LoginIcon />
              </IconButton>
            </Link>
          )}

          {/* App list design */}
          <IconButton className={hstyle.app_btn}>
            <AppsIcon />
          </IconButton>
          <ul className={hstyle.app_list}>
            <Link href="/todos">
              <li className="">
                <FormatListNumberedIcon />
                <span className="text-xs">Todos</span>
              </li>
            </Link>
            <li className="">
              <NoteIcon />
              <span className="text-xs">Notes</span>
            </li>
            <li className="">
              <FindInPageIcon />
              <span className="text-xs">Resource</span>
            </li>
            <li className="">
              <CreateIcon />
              <span className="text-xs">Create</span>
            </li>
            <li className="">
              <ShoppingCartIcon />
              <span className="text-xs">Shop</span>
            </li>
            <li className="">
              <WorkIcon />
              <span className="text-xs">Jobs</span>
            </li>
            <li className="">
              <GroupIcon />
              <span className="text-xs">Community</span>
            </li>
            <li className="">
              <MessageIcon />
              <span className="text-xs">Message</span>
            </li>
          </ul>
          {/* App list design */}

          <IconButton aria-label="option" className={hstyle.option_btn}>
            <ArrowDropDownCircleIcon />
          </IconButton>

          <ul className={hstyle.option_list}>
            {user?.name && (
              <Link href={'/about'}>
                <li className="flex items-center">
                  <span className="dark:text-white">
                    <SettingsIcon />
                  </span>
                  <span className="mx-auto">Settings</span>
                </li>
              </Link>
            )}
            <Link href={'/about'}>
              <li className="flex items-center">
                <span className="dark:text-white">
                  <InfoIcon />
                </span>
                <span className="mx-auto">About Us</span>
              </li>
            </Link>
            <li onClick={toggleTheme} className="flex items-center">
              <span className="dark:text-white">
                <Brightness6Icon />
              </span>
              <span className="mx-auto">{themeTitle}</span>
            </li>

            {user?.name && (
              <li className="flex items-center" onClick={logOut}>
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
