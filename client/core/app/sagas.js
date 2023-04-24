/* global gtag */
import { takeLatest, fork, put, call } from 'redux-saga/effects'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { LOCATION_CHANGE, push } from 'redux-first-history'

import { local_storage_adapter } from '@core/utils'
import history from '@core/history'
import { app_actions } from './actions'

const fpPromise = FingerprintJS.load()

// cookie-less / anonymous GA reporting
async function pageView() {
  if (!window.gtag) {
    return
  }

  const fp = await fpPromise
  const result = await fp.get()

  gtag('config', '', {
    page_path: history.location.pathname,
    client_storage: 'none',
    anonymize_ip: true,
    client_id: result.visitorId
  })
}

function save_key({ private_key, public_key }) {
  local_storage_adapter.setItem('parcels_private_key', private_key)
  local_storage_adapter.setItem('parcels_public_key', public_key)
}

// function* establish_user_session() {
//   const { private_key, public_key } = yield select(get_app)
//   if (!private_key || !public_key) {
//     return
//   }

//   const timestamp = Date.now()
//   const data = { timestamp, public_key }
//   const hash = blake2b(JSON.stringify(data), null, 32)
//   const signature = new Ed25519().sign(hash, Convert.hex2ab(private_key))
//   yield call(post_user_session, { data, signature: Convert.ab2hex(signature) })
// }

async function load_keys() {
  const private_key = await local_storage_adapter.getItem('parcels_private_key')
  const public_key = await local_storage_adapter.getItem('parcels_public_key')
  return { private_key, public_key }
}

export function* load() {
  const { private_key, public_key } = yield call(load_keys)
  if (private_key && public_key) {
    yield put(app_actions.load_keys({ private_key, public_key }))
    // yield call(establish_user_session)
  }

  yield put(app_actions.loaded())
}

export function reset() {
  window.scrollTo(0, 0)
  pageView()
}

export function load_from_new_keypair({ payload }) {
  const { private_key, public_key } = payload
  save_key({ private_key, public_key })
  // yield call(establish_user_session)
}

export function* load_from_private_key({ payload }) {
  const { private_key, public_key } = payload
  save_key({ private_key, public_key })
  yield put(push('/'))
  // yield call(establish_user_session)
}

//= ====================================
//  WATCHERS
// -------------------------------------

export function* watchInitApp() {
  yield takeLatest(app_actions.APP_LOAD, load)
}

export function* watchLocationChange() {
  yield takeLatest(LOCATION_CHANGE, reset)
}

export function* watch_load_from_new_keypair() {
  yield takeLatest(app_actions.LOAD_FROM_NEW_KEYPAIR, load_from_new_keypair)
}

export function* watch_load_from_private_key() {
  yield takeLatest(app_actions.LOAD_FROM_PRIVATE_KEY, load_from_private_key)
}

//= ====================================
//  ROOT
// -------------------------------------

export const appSagas = [
  fork(watchInitApp),
  fork(watchLocationChange),
  fork(watch_load_from_new_keypair),
  fork(watch_load_from_private_key)
]
