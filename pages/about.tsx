import Head from 'next/head'
import React, { ReactElement } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import { useStateValue } from '../service/Store'
import WebLayout from '../components/WebLayout'
import Banner from '../components/about/Banner'
import Link from 'next/link'
import { Button } from '@mui/material'

const About = () => {
  const [{ siteName }] = useStateValue()
  return (
    <div className="bg-blue-100 dark:bg-slate-900">
      <Head>
        <title>About | {siteName}</title>
      </Head>
      <Banner />
      <div className="container mx-auto mt-8 lg:mt-24">
        <div className="my-4 flex flex-col items-center justify-center">
          <h1 className="my-2 w-40 border-b-2 border-blue-300 py-1 px-2 text-3xl dark:border-slate-600">
            Features
          </h1>
          <ul className="group-defaul:font-bold text-3xl lg:text-5xl">
            <li className="py-2">
              <DoneIcon color="success" /> Connect People
            </li>
            <li className="py-2">
              <DoneIcon color="success" /> Spread Knowledge
            </li>
            <li className="py-2">
              <DoneIcon color="success" /> Hire Workers
            </li>
            <li className="py-2">
              <DoneIcon color="success" /> Confer Skills
            </li>
            <li className="py-2">
              <DoneIcon color="success" /> Grow Business
            </li>
            <li className="py-2">
              <DoneIcon color="success" /> Collect Informations
            </li>
          </ul>
        </div>

        <div className="p-3 text-sm md:text-base">
          <span className="text-lg lg:text-xl">{siteName} </span>
          is a multi services platform. <br />
          It is established by <em>MD: Hasib Nadim</em> at 2022. <br />
          <em>MD: Hasib Nadim</em> is citizen of Bangladesh, <br />
          A JavaScript & Web developer and Freelancer,
          <br />
          BSc in Physics.
        </div>
        <Link href={'/support'}>
          <a className="block  p-2">
            <Button variant="outlined" size="large">
              Contact Us
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}
About.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>
}
export default About
