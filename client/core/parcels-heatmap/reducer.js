import { List } from 'immutable'
import { parcels_heatmap_actions } from './actions'
import { parcel_view_actions } from '@core/parcel-views'
import { app_actions } from '@core/app'

export function parcels_heatmap_reducer(state = new List(), { payload, type }) {
  switch (type) {
    case parcel_view_actions.PARCEL_VIEW_STATE_CHANGED:
    case parcel_view_actions.SAVE_PARCELS_VIEW:
    case app_actions.SET_SELECTED_PARCEL_VIEW_ID:
      return new List()

    case parcels_heatmap_actions.GET_HEATMAP_FULFILLED:
      return List(
        payload.data.map(({ h3_index, parcel_count, avg_rank }) => ({
          h3_index,
          parcel_count,
          avg_rank
        }))
      )

    default:
      return state
  }
}
