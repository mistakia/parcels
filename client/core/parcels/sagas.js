import { call, takeLatest, fork, select, takeLeading } from 'redux-saga/effects'
import { Map } from 'immutable'

import { getParcels } from '@core/api'
import {
  parcel_view_actions,
  get_selected_parcel_view
} from '@core/parcel-views'
import { parcel_actions } from './actions'

export function* load_parcels({ payload }) {
  const parcel_view = yield select(get_selected_parcel_view)
  const view_table_state = parcel_view.get('table_state', new Map())
  const params = view_table_state.toJS()
  if (params.columns) {
    params.columns = params.columns.map(({ column_name, table_name }) => ({
      column_name,
      table_name
    }))
    params.offset = yield select((state) => state.get('parcels').size)
  }
  params.view_id = payload.view_id
  yield call(getParcels, params)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_load_more_parcels() {
  yield takeLeading(parcel_actions.LOAD_MORE_PARCELS, load_parcels)
}

export function* watchSetParcelsViewTableState() {
  yield takeLatest(
    parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE,
    load_parcels
  )
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcelSagas = [
  fork(watch_load_more_parcels),
  fork(watchSetParcelsViewTableState)
]
