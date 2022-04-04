import Head from 'next/head'
import React, { ReactElement } from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import DoneIcon from '@mui/icons-material/Done'
import { useStateValue } from '../service/Store'
import WebLayout from '../components/WebLayout'

const About = () => {
  const [{ siteName }] = useStateValue()
  return (
    <div className="bg-blue-100 dark:bg-slate-900">
      <Head>
        <title>About | {siteName}</title>
      </Head>
      <div className="about_header">
        <p className="pt-10 text-center text-7xl  md:pt-28 md:text-8xl">
          {siteName}
        </p>
      </div>
      <div className="container mx-auto ">
        <div className="-mt-20 flex flex-wrap items-center justify-around lg:flex-nowrap">
          <div className="about_card">
            <BusinessCenterIcon fontSize="large" />
            <h1 className="text-2xl lg:text-4xl">Grow Bussiness</h1>
          </div>
          <div className="about_card">
            <ConnectWithoutContactIcon fontSize="large" />
            <h1 className="text-2xl lg:text-4xl">Connect Society</h1>
          </div>
          <div className="about_card">
            <TravelExploreIcon fontSize="large" />
            <h1 className="text-2xl lg:text-4xl">Exploring Talent</h1>
          </div>
        </div>
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
      </div>
    </div>
  )
}
About.getLayout=function getLayout(page:ReactElement){
  return (
    <WebLayout>
      {page}
    </WebLayout>
  )
}
export default About
