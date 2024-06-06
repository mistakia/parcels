import { Record } from 'immutable'

import { app_actions } from './actions'
import { DEFAULT_PARCEL_VIEW_ID } from '@core/constants'
import { parcel_view_actions } from '@core/parcel-views/actions'

const initialState = new Record({
  isLoaded: false,
  public_key: null,
  private_key: null,
  selected_parcel_view_id: DEFAULT_PARCEL_VIEW_ID
})

export function appReducer(state = initialState(), { payload, type }) {
  switch (type) {
    case app_actions.APP_LOADED:
      return state.merge({ isLoaded: true })

    case parcel_view_actions.PARCEL_VIEW_STATE_CHANGED: {
      const { view_id } = payload.parcel_view
      return state.merge({ selected_parcel_view_id: view_id })
    }

    case app_actions.SET_SELECTED_PARCEL_VIEW_ID: {
      const { selected_parcel_view_id } = payload
      return state.merge({ selected_parcel_view_id })
    }

    case app_actions.LOAD_KEYS:
    case app_actions.LOAD_FROM_PRIVATE_KEY:
    case app_actions.LOAD_FROM_NEW_KEYPAIR:
      return state.merge({
        public_key: payload.public_key,
        private_key: payload.private_key
      })

    default:
      return state
  }
}
