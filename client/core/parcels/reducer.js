import { Map } from 'immutable'

import { parcelActions } from './actions'
import { Parcel } from './parcel'
import { parcel_view_actions } from '@core/parcel-views'

export function parcelsReducer(state = new Map(), { payload, type }) {
  switch (type) {
    case parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE:
      return new Map()

    case parcelActions.GET_PARCELS_FULFILLED:
      return state.withMutations((state) => {
        payload.data.forEach((parcel) =>
          state.set(parcel.path, new Parcel(parcel))
        )
      })

    default:
      return state
  }
}
