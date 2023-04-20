import { call, takeLatest, fork, select } from 'redux-saga/effects'

import { get_parcel_views, post_parcel_view } from '@core/api'
import { app_actions } from '@core/app'
import { parcel_view_actions } from './actions'

export function* load_parcel_views() {
  yield call(get_parcel_views)
}

export function* save_parcel_view_table_state({ payload }) {
  const { view_id } = payload
  const view = yield select((state) =>
    state.getIn(['parcel_views', `${view_id}`])
  )

  const params = {
    view_name: view.get('view_name'),
    view_description: view.get('view_description'),
    table_state: view.get('table_state').toJS(),
    user_public_key: 0, // TODO
    user_signature: 0 // TODO
  }
  yield call(post_parcel_view, params)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_app_loaded() {
  yield takeLatest(app_actions.APP_LOADED, load_parcel_views)
}

export function* watch_set_parcels_view_table_state() {
  yield takeLatest(
    parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE,
    save_parcel_view_table_state
  )
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcel_view_sagas = [
  fork(watch_app_loaded),
  fork(watch_set_parcels_view_table_state)
]
