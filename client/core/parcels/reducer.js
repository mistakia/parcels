import { Map } from 'immutable'

import { parcelActions } from './actions'
import { Parcel } from './parcel'

export function parcelsReducer(state = new Map(), { payload, type }) {
  switch (type) {
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
