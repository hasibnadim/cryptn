import { createContext, useContext } from 'react'

export interface initialValueTypes {
  siteName: String
  user: {
    loading: Boolean
    name: String
    email: String
    photoUrl: String
  }
}

export const initialValue: initialValueTypes = {
  siteName: 'Cryptn',
  user: {
    loading: true,
    name: '',
    email: '',
    photoUrl: '',
  },
}

export const Store = createContext(initialValue)

export const useStateValue: any = () => useContext(Store)
