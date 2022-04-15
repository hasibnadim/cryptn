import { getAuth } from 'firebase/auth'
import React, {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  Dispatch,
  useEffect,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { reducer } from './reducer'

export interface userType {
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
export interface Action {
  type: 'SET_USER'
  payload: any
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

const Store = createContext<
  [state: initialValueType, dispatch: Dispatch<Action>]
>([initv, () => null])

interface props {
  children: ReactElement
}
export const WebStateProvider = ({ children }: props) => {
  const auth = getAuth()
  const [v, dispatch] = useReducer(reducer, initv)
  const [newuser, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (!loading) {
      if (newuser) {
        newuser
          ?.getIdToken()
          .then((token) => {
            dispatch({
              type: 'SET_USER',
              payload: {
                loading: false,
                isLogin: true,
                uid: newuser?.uid || '',
                token: token || '',
                name: newuser?.displayName || '',
                email: newuser?.email || '',
                photoUrl: newuser?.photoURL || '',
              },
            })
          })
          .catch((err) => {
            dispatch({
              type: 'SET_USER',
              payload: {
                loading: false,
                isLogin: false,
                uid: '',
                token: '',
                name: '',
                email: '',
                photoUrl: '',
              },
            })
          })
      } else {
        dispatch({
          type: 'SET_USER',
          payload: {
            loading: false,
            isLogin: false,
            uid: '',
            token: '',
            name: '',
            email: '',
            photoUrl: '',
          },
        })
      }
    }
  }, [newuser, error, loading])

  return <Store.Provider value={[v, dispatch]}>{children}</Store.Provider>
}

export const useStateValue = () => useContext(Store)
