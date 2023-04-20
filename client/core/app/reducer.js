import { Record } from 'immutable'

import { app_actions } from './actions'
import { DEFAULT_PARCEL_VIEW_ID } from '@core/constants'

const initialState = new Record({
  isLoaded: false,
  publicKey: null,
  selected_parcel_view_id: DEFAULT_PARCEL_VIEW_ID
})

export function appReducer(state = initialState(), { payload, type }) {
  switch (type) {
    case app_actions.APP_LOADED:
      return state.merge({ isLoaded: true })

    case app_actions.SET_SELECTED_PARCEL_VIEW_ID: {
      const { selected_parcel_view_id } = payload
      return state.merge({ selected_parcel_view_id })
    }

    default:
      return state
  }
}
