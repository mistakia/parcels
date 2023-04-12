import { call, put, cancelled } from 'redux-saga/effects'
// import { LOCATION_CHANGE } from 'redux-first-history'

import { api, apiRequest } from '@core/api/service'
import { get_parcels_actions, get_parcels_count_actions } from '@core/parcels'
import { get_parcel_column_actions } from '@core/parcel-columns'
import { get_parcel_views_actions } from '@core/parcel-views'

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

export const get_parcels = fetch.bind(
  null,
  api.get_parcels,
  get_parcels_actions
)
export const get_parcels_count = fetch.bind(
  null,
  api.get_parcels_count,
  get_parcels_count_actions
)
export const get_parcel_columns = fetch.bind(
  null,
  api.get_parcel_columns,
  get_parcel_column_actions
)
export const get_parcel_views = fetch.bind(
  null,
  api.get_parcel_views,
  get_parcel_views_actions
)
