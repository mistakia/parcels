import { Map } from 'immutable'

import { parcel_view_actions } from './actions'
import { ParcelView, ParcelViewTableState } from './parcel-view'
import { DEFAULT_PARCEL_VIEW_ID } from '@core/constants'

const initial_state = new Map({
  [DEFAULT_PARCEL_VIEW_ID]: new ParcelView({
    id: DEFAULT_PARCEL_VIEW_ID,
    name: 'View #1'
  })
})

export function parcel_view_reducer(state = initial_state, { payload, type }) {
  switch (type) {
    case parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE:
      return state.setIn(
        [`${payload.view_id}`, 'table_state'],
        new ParcelViewTableState(payload.view_table_state)
      )

    default:
      return state
  }
}
