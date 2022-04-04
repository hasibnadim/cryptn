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
    <main className="h-full">
      <Header />
      {children}
      <Footer />
    </main>
    </WebStateProvider>
  )
}

export default WebLayout
