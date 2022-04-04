import React, {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  Dispatch,
} from 'react'
import { reducer } from './reducer'

export interface userType{
  loading: Boolean
  isLogin: Boolean
  uid: string
  token: string
  name: string
  email: string
  photoUrl: string
}

export interface initialValueType {
  siteName: string
  user: userType
}
export interface Action{
  type:'SET_USER';
  payload:any
}

const initv: initialValueType = {
  siteName: 'Cryptn',
  user: {
    loading: true,
    isLogin: false,
    uid: '',
    token: '',
    name: '',
    email: '',
    photoUrl: '',
  },
}

const Store = createContext<[state: initialValueType, dispatch: Dispatch<Action>]>(
  [initv, () => null]
)

interface props {
  children: ReactElement
}
export const WebStateProvider = ({ children }: props) => {
  //const [v, dispatch] = useReducer(reducer, initv)

  return <Store.Provider value={useReducer(reducer, initv)}>{children}</Store.Provider>
}

export const useStateValue = () => useContext(Store)
