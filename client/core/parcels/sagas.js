import { call, takeLatest, fork, select } from 'redux-saga/effects'
import { Map } from 'immutable'

import { appActions } from '@core/app'
import { getParcels } from '@core/api'
import {
  parcel_view_actions,
  get_selected_parcel_view
} from '@core/parcel-views'

export function* load_parcels() {
  const parcel_view = yield select(get_selected_parcel_view)
  const view_table_state = parcel_view.get('table_state', new Map())
  const params = view_table_state.toJS()
  if (params.columns) {
    params.columns = params.columns.map(({ column_name, table_name }) => ({
      column_name,
      table_name
    }))
  }
  yield call(getParcels, params)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watchAppLoaded() {
  yield takeLatest(appActions.APP_LOADED, load_parcels)
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
  fork(watchAppLoaded),
  fork(watchSetParcelsViewTableState)
]
