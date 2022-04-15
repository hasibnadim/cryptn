import { Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React, { FormEvent, ReactElement } from 'react'
import WebLayout from '../components/WebLayout'
import { useStateValue } from '../service/Store'

const support = () => {
  const [{ siteName, user }] = useStateValue()
  const handleFrom = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className="container mx-auto flex">
      <Head>
        <title>Support | {siteName}</title>
      </Head>
    
      <form onSubmit={(e) => handleFrom(e)} className="m-1 h-full mx-auto w-full p-2 lg:pt-10 ">
      <h5 className='text-4xl whitespace-pre py-5'>Contact Us</h5>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Name"
            defaultValue={user.name}
            disabled={!user.loading && user.isLogin}
            className="m-1 block w-full rounded bg-blue-100 p-2 outline-none dark:bg-slate-700"
          />
          <input
            type="email"
            placeholder="Email"
            disabled={!user.loading && user.isLogin}
            defaultValue={user.email}
            className="m-1 block w-full rounded bg-blue-100 p-2 outline-none dark:bg-slate-700"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Subject"
            className="m-1 block w-full rounded bg-blue-100 p-2 outline-none dark:bg-slate-700"
          />
        </div>
        <div className="flex">
          <textarea
            placeholder="Message"
            className="m-1 block h-40  w-full bg-blue-100 p-2 dark:bg-slate-700"
          ></textarea>
        </div>

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
      <div className='w-full hidden lg:block py-2'>
        <Image src={'/icons/operator.svg'} layout='responsive' width={"100%"} height="100%" />
      </div>
    </div>
  )
}
support.getLayout = function getLayout(page: ReactElement) {
  return <WebLayout>{page}</WebLayout>
}
export default support
