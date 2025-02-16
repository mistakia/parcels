import { call, takeLatest, fork } from 'redux-saga/effects'

import { get_parcel } from '@core/api'
import { parcel_actions } from './actions'

export function* load_parcel({ payload }) {
  const { ll_uuid } = payload
  yield call(get_parcel, { ll_uuid })
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_load_parcel() {
  yield takeLatest(parcel_actions.LOAD_PARCEL, load_parcel)
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcel_sagas = [fork(watch_load_parcel)]
