import { Map } from 'immutable'

import { parcel_actions } from './actions'

export function parcel_reducer(state = new Map(), { payload, type }) {
  switch (type) {
    case parcel_actions.GET_PARCEL_FULFILLED:
      return state.set(payload.opts.ll_uuid, payload.data)

    default:
      return state
  }
}
