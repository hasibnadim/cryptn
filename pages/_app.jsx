import '../styles/globals.css'
//import type { AppProps } from 'next/app'
import '../service/firebase'
import { useReducer } from 'react'
import { initialValue, Store } from '../service/Store'
import { reducer } from '../service/reducer'

function MyApp({ Component, pageProps }) {
  return (
    <Store.Provider value={useReducer(reducer, initialValue)}>
      <Component {...pageProps} />
    </Store.Provider>
  )
}

export default MyApp
