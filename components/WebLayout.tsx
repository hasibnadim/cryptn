import React, { ReactElement } from 'react'
import { WebStateProvider } from '../service/Store'
import Footer from './Footer'
import Header from './Header'

interface props {
  children: ReactElement | ReactElement[]
}
const WebLayout = ({ children }: props) => {
  return (
    <WebStateProvider>
      <main className="flex min-h-screen flex-col ">
        <Header />
        <section className=" flex-grow bg-blue-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
          {children}
        </section>
        <Footer />
      </main>
    </WebStateProvider>
  )
}

export default WebLayout
