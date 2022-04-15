import React from 'react'
import { useStateValue } from '../../service/Store'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
const Banner = () => {
  const [{ siteName }] = useStateValue()
  return (
    <div className="about_header">
      <p className="pt-10 text-center text-7xl  md:pt-28 md:text-8xl">
        {siteName}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-around md:mt-24 lg:flex-nowrap">
        <div className="about_card">
          <BusinessCenterIcon fontSize="large" />
          <h1>Grow Bussiness</h1>
        </div>
        <div className="about_card">
          <ConnectWithoutContactIcon fontSize="large" />
          <h1>Connect Society</h1>
        </div>
        <div className="about_card">
          <TravelExploreIcon fontSize="large" />
          <h1>Explore Talent</h1>
        </div>
      </div>
    </div>
  )
}

export default Banner
