import { Map } from 'immutable'

import { parcel_actions } from '@core/parcels/actions'
import { parcel_view_actions } from './actions'

export function parcel_view_reducer(state = new Map(), { payload, type }) {
  switch (type) {
    case parcel_view_actions.PARCEL_VIEW_STATE_CHANGED: {
      const { parcel_view } = payload
      return state.mergeIn([`${parcel_view.view_id}`], {
        ...parcel_view,
        table_state: new Map(parcel_view.table_state)
      })
    }

    case parcel_view_actions.SAVE_PARCELS_VIEW: {
      const { parcel_view } = payload
      return state.mergeIn([`${parcel_view.view_id}`], {
        ...parcel_view,
        table_state: new Map(parcel_view.table_state),
        saved_table_state: new Map(parcel_view.table_state)
      })
    }

    case parcel_actions.GET_PARCELS_PENDING:
      return state.setIn([`${payload.opts.view_id}`, 'is_fetching'], true)

    case parcel_actions.GET_PARCELS_FAILED:
    case parcel_actions.GET_PARCELS_FULFILLED:
      return state.setIn([`${payload.opts.view_id}`, 'is_fetching'], false)

    case parcel_actions.GET_PARCELS_COUNT_FULFILLED:
      return state.setIn(
        [`${payload.opts.view_id}`, 'total_row_count'],
        Number(payload.data.total_row_count)
      )

    case parcel_view_actions.GET_VIEWS_FULFILLED:
      return state.withMutations((map) => {
        payload.data.forEach((view) => {
          map.set(
            view.view_id,
            new Map({
              ...view,
              table_state: new Map(view.table_state),
              saved_table_state: new Map(view.table_state)
            })
          )
        })
      })

    case parcel_view_actions.POST_PARCEL_VIEW_FULFILLED:
      return state.set(
        payload.data.view_id,
        new Map({
          ...payload.data,
          table_state: new Map(payload.data.table_state),
          saved_table_state: new Map(payload.data.table_state)
        })
      )

    case parcel_view_actions.DELETE_PARCEL_VIEW_FULFILLED:
      return state.delete(payload.opts.view_id)

    default:
      return state
  }
}
