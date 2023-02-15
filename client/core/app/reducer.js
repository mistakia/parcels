import { Record } from 'immutable'

import { appActions } from './actions'

const initialState = new Record({
  isLoaded: false,
  publicKey: null
})

export function appReducer(state = initialState(), { payload, type }) {
  switch (type) {
    case appActions.APP_LOADED:
      return state.merge({ isLoaded: true })

    default:
      return state
  }
}
