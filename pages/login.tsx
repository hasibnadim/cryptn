import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useStateValue } from '../service/Store'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import lstyle from '../styles/login.module.css'

const Login: NextPage = () => {
  const router = useRouter()

  const q = router.query
  const [{ user }] = useStateValue()

  firebase.initializeApp({
    apiKey: 'AIzaSyByaIp19WulwPm9s3xfZ1azAFVvQIWIgAw',
    authDomain: 'crypt-b.firebaseapp.com',
    projectId: 'crypt-b',
    storageBucket: 'crypt-b.appspot.com',
    messagingSenderId: '494623498635',
    appId: '1:494623498635:web:c9485d18739701e5a30f8e',
  })
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/profile',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  }

  useEffect(() => {
    if (!user.loading && user.name) {
      router.push('/profile')
    }
  }, [user.loading, user.name])

  return (
    <div className="flex h-full flex-col">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={lstyle.from_block}>
        <div className={lstyle.from_sign}>
          <p className="text-yellow-600 dark:text-yellow-400">{q.warningmsg}</p>
          <h1 className='p-1 text-lg'>Let's continue with</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
         

        
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
