import Head from 'next/head'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useStateValue } from '../service/Store'

const About = () => {
  const [{ siteName }] = useStateValue()
  return (
    <div>
      <Head>
        <title>About | {siteName}</title>
      </Head>
      <Header />
      <div className="about_header">
        <p className="pt-28 text-center text-8xl"> {siteName}</p>
      </div>
      <div className="mx-auto w-64 h-96">
          <span className='text-xl'>{siteName} is a website.</span>
          </div>
      <Footer />
    </div>
  )
}

export default About
