import { Map } from 'immutable'

import { heatmap_actions } from './actions'

export function heatmap_reducer(state = new Map(), { payload, type }) {
  switch (type) {
    case heatmap_actions.GET_HEATMAP_TILE_FULFILLED:
      return state.withMutations((state) => {
        payload.data.forEach((h3_cell) =>
          state.set(h3_cell.h3_res4_id, h3_cell)
        )
      })

    default:
      return state
  }
}
