import { Action, initialValueType } from './Store'

export const reducer = (
  state: initialValueType,
  action: Action
) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    default:
      return state
  }
}
