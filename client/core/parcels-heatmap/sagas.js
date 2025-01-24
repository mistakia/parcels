import { call, takeLatest, fork, select } from 'redux-saga/effects'
import { get_parcels_heatmap } from '@core/api'
import { get_selected_parcel_view } from '@core/parcel-views'
import { parcels_heatmap_actions } from './actions'

export function* load_heatmap() {
  const parcel_view = yield select(get_selected_parcel_view)
  const params = parcel_view.table_state

  if (!params) {
    return
  }

  params.view_id = parcel_view.view_id
  yield call(get_parcels_heatmap, params)
}

export function* watch_load_parcels_heatmap() {
  yield takeLatest(parcels_heatmap_actions.LOAD_PARCELS_HEATMAP, load_heatmap)
}

export const parcels_heatmap_sagas = [fork(watch_load_parcels_heatmap)]
