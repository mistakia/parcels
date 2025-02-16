import { List } from 'immutable'

import { parcel_actions } from './actions'
import { Parcel } from './parcel'
import { parcel_view_actions } from '@core/parcel-views'
import { app_actions } from '@core/app'

export function parcels_reducer(state = new List(), { payload, type }) {
  switch (type) {
    case parcel_view_actions.PARCEL_VIEW_STATE_CHANGED:
    case parcel_view_actions.SAVE_PARCELS_VIEW:
      return new List()

    case app_actions.SET_SELECTED_PARCEL_VIEW_ID:
      return new List()

    case parcel_actions.GET_PARCELS_FULFILLED:
      return state.withMutations((state) => {
        payload.data.forEach((parcel) => state.push(new Parcel(parcel)))
      })

    default:
      return state
  }
}
