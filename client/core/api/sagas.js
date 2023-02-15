import { call, put, cancelled } from 'redux-saga/effects'
// import { LOCATION_CHANGE } from 'redux-first-history'

import { api, apiRequest } from '@core/api/service'
import { getParcelsActions } from '@core/parcels'

function* fetchAPI(apiFunction, actions, opts = {}) {
  const { abort, request } = apiRequest(apiFunction, opts)
  try {
    yield put(actions.pending(opts))
    const data = yield call(request)
    yield put(actions.fulfilled(opts, data))
  } catch (err) {
    console.log(err)
    if (!opts.ignoreError) {
      /* yield put(notificationActions.show({ severity: 'error', message: err.message }))
       * Bugsnag.notify(err, (event) => {
       *   event.addMetadata('options', opts)
       * }) */
    }
    yield put(actions.failed(opts, err.toString()))
  } finally {
    if (yield cancelled()) {
      abort()
    }
  }
}

function* fetch(...args) {
  yield call(fetchAPI.bind(null, ...args))
  // yield race([call(fetchAPI.bind(null, ...args)), take(LOCATION_CHANGE)])
}

export const getParcels = fetch.bind(null, api.getParcels, getParcelsActions)
