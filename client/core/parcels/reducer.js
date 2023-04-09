import { List } from 'immutable'

import { parcel_actions } from './actions'
import { Parcel } from './parcel'
import { parcel_view_actions } from '@core/parcel-views'

export function parcelsReducer(state = new List(), { payload, type }) {
  switch (type) {
    case parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE:
      return new List()

    case parcel_actions.GET_PARCELS_FULFILLED:
      return state.withMutations((state) => {
        payload.data.forEach((parcel) => state.push(new Parcel(parcel)))
      })

    default:
      return state
  }
}
