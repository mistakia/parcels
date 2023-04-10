import { call, takeLatest, fork, select, takeLeading } from 'redux-saga/effects'
import { Map } from 'immutable'

import { get_parcels, get_parcels_count } from '@core/api'
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
  yield call(get_parcels, params)

  const total_row_count = parcel_view.get('total_row_count')
  if (total_row_count === null) {
    yield call(get_parcels_count, params)
  }
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
