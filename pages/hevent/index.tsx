import React, { ReactElement } from 'react'
import TodaysEvent from '../../components/field/TodaysEvent'
import WebLayout from '../../components/WebLayout'

const Hevent = () => {
  return (
    <div className='container mx-auto'><TodaysEvent /></div>
  )
}

Hevent.getLayout = function getLayout(page: ReactElement) {
    return <WebLayout>{page}</WebLayout>
  }
export default Hevent