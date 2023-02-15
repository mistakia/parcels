import { call, takeLatest, fork } from 'redux-saga/effects'

import { appActions } from '@core/app'
import { getParcels } from '@core/api'

export function* load_parcels() {
  yield call(getParcels)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watchAppLoaded() {
  yield takeLatest(appActions.APP_LOADED, load_parcels)
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcelSagas = [fork(watchAppLoaded)]
