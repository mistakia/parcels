import { List } from 'immutable'

import { parcel_column_actions } from './actions'

export function parcel_column_reducer(state = new List(), { payload, type }) {
  switch (type) {
    case parcel_column_actions.GET_PARCEL_COLUMNS_FULFILLED:
      return new List(payload.data)

    default:
      return state
  }
}
