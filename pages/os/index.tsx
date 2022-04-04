
import React, { ReactElement } from 'react'
import WebLayout from '../../components/WebLayout'

const OS = () => {
  return (
    <div className='flex justify-center items-center flex-col h-full'>
        <span className='text-5xl'>C-OS</span>
        <span>(Cryptn OS)</span>
        <span className='text-xl'>Comming Soon ..</span>
    </div>
  )
}
OS.getLayout=function getLayout(page:ReactElement){
    return (
      <WebLayout>
        {page}
      </WebLayout>
    )
  }
export default OS