import { initialValueTypes } from './Store'

export const reducer = (
  state: initialValueTypes,
  action: { type: String; payload: any }
) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    default:
      return state
  }
}
