import { call, takeLatest, fork } from 'redux-saga/effects'

import { get_parcel_views } from '@core/api'
import { appActions } from '@core/app'

export function* load_parcel_views() {
  yield call(get_parcel_views)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_app_loaded() {
  yield takeLatest(appActions.APP_LOADED, load_parcel_views)
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcel_view_sagas = [fork(watch_app_loaded)]
