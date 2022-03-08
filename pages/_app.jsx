import '../styles/globals.css'
//import type { AppProps } from 'next/app'
import '../service/firebase'
import { useReducer } from 'react'
import { initialValue, Store } from '../service/Store'
import { reducer } from '../service/reducer'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <Store.Provider value={useReducer(reducer, initialValue)}>
      <main className="h-full">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </Store.Provider>
  )
}

export default MyApp
