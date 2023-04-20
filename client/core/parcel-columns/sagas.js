import { call, takeLatest, fork } from 'redux-saga/effects'

import { get_parcel_columns } from '@core/api'
import { app_actions } from '@core/app'

export function* load_parcel_columns() {
  yield call(get_parcel_columns)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_app_loaded() {
  yield takeLatest(app_actions.APP_LOADED, load_parcel_columns)
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcel_column_sagas = [fork(watch_app_loaded)]
