import { call, takeLatest, fork } from 'redux-saga/effects'

import { get_heatmap_tile } from '@core/api'
import { heatmap_actions } from './actions'

export function* load_heatmap_tile({ payload }) {
  const { ne_lat, ne_lon, sw_lat, sw_lon } = payload
  const params = {
    ne_lat,
    ne_lon,
    sw_lat,
    sw_lon
  }

  yield call(get_heatmap_tile, params)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_load_heatmap_tile() {
  yield takeLatest(heatmap_actions.LOAD_HEATMAP_TILE, load_heatmap_tile)
}

//= ====================================
//  ROOT
// -------------------------------------

export const heatmap_sagas = [fork(watch_load_heatmap_tile)]
