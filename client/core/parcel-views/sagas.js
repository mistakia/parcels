import { call, takeLatest, fork, put, select } from 'redux-saga/effects'
import Ed25519 from 'nanocurrency-web/dist/lib/ed25519'
import Convert from 'nanocurrency-web/dist/lib/util/convert'
import { blake2b } from 'blakejs'

import {
  get_parcel_views,
  post_parcel_view,
  delete_parcels_view
} from '@core/api'
import { app_actions, get_app } from '@core/app'
import { parcel_view_actions } from './actions'
import { get_all_parcel_views } from './selectors'

export function* load_parcel_views() {
  yield call(get_parcel_views)
}

export function* init_parcel_views({ payload }) {
  if (payload.data.length) {
    const { view_id } = payload.data[0]
    yield put(app_actions.set_selected_parcel_view_id(view_id))
  } else {
    const params = {
      view_name: 'Default View',
      view_description: 'Default View',
      table_state: {
        sort: [],
        columns: [
          {
            column_id: 'path'
          },
          {
            column_id: 'll_gisacre'
          },
          {
            column_id: 'address'
          },
          {
            column_id: 'usecode'
          },
          {
            column_id: 'usedesc'
          },
          {
            column_id: 'zoning'
          },
          {
            column_id: 'zoning_description'
          },
          {
            column_id: 'lat'
          },
          {
            column_id: 'lon'
          }
        ]
      }
    }

    const { public_key: user_public_key, private_key } = yield select(get_app)
    const hash = blake2b(JSON.stringify(params), null, 32)
    const user_signature = new Ed25519().sign(hash, Convert.hex2ab(private_key))
    yield call(post_parcel_view, {
      ...params,
      user_public_key,
      user_signature: Convert.ab2hex(user_signature)
    })
  }
}

export function* set_selected_parcel_view({ payload }) {
  const { selected_parcel_view_id } = yield select(get_app)
  // if no selected parcel view id or on a new parcel view
  if (!selected_parcel_view_id || !payload.opts.view_id) {
    yield put(app_actions.set_selected_parcel_view_id(payload.data.view_id))
  }
}

export function* save_parcel_view_table_state({ payload }) {
  const { parcel_view } = payload
  const { view_id, view_name, view_description, table_state } = parcel_view

  const params = {
    view_name,
    view_description,
    table_state
  }

  const { public_key: user_public_key, private_key } = yield select(get_app)
  const hash = blake2b(JSON.stringify(params), null, 32)
  const user_signature = new Ed25519().sign(hash, Convert.hex2ab(private_key))

  yield call(post_parcel_view, {
    ...params,
    view_id,
    user_public_key,
    user_signature: Convert.ab2hex(user_signature)
  })
}

export function* remove_parcels_view({ payload }) {
  const { view_id } = payload

  yield call(delete_parcels_view, { view_id })
  const { selected_parcel_view_id } = yield select(get_app)
  if (selected_parcel_view_id === view_id) {
    const parcel_views = yield select(get_all_parcel_views)
    if (parcel_views.size) {
      const view = parcel_views.first()
      yield put(app_actions.set_selected_parcel_view_id(view.get('view_id')))
    }
  }
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watch_app_loaded() {
  yield takeLatest(app_actions.APP_LOADED, load_parcel_views)
}

export function* watch_save_parcels_view() {
  yield takeLatest(
    parcel_view_actions.SAVE_PARCELS_VIEW,
    save_parcel_view_table_state
  )
}

export function* watch_get_views_fulfilled() {
  yield takeLatest(parcel_view_actions.GET_VIEWS_FULFILLED, init_parcel_views)
}

export function* watch_post_parcel_view_fulfilled() {
  yield takeLatest(
    parcel_view_actions.POST_PARCEL_VIEW_FULFILLED,
    set_selected_parcel_view
  )
}

export function* watch_delete_parcels_view() {
  yield takeLatest(parcel_view_actions.DELETE_PARCELS_VIEW, remove_parcels_view)
}

//= ====================================
//  ROOT
// -------------------------------------

export const parcel_view_sagas = [
  fork(watch_app_loaded),
  fork(watch_save_parcels_view),
  fork(watch_get_views_fulfilled),
  fork(watch_post_parcel_view_fulfilled),
  fork(watch_delete_parcels_view)
]
