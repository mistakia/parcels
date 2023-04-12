/* global AbortController, fetch */

import qs from 'qs'
import merge from 'merge-options'

import { API_URL } from '@core/constants'

/* const POST = (data) => ({
 *   method: 'POST',
 *   body: JSON.stringify(data),
 *   headers: {
 *     'Content-Type': 'application/json'
 *   }
 * })
 *  */

export const api = {
  get_parcels(params) {
    const url = `${API_URL}/parcels?${qs.stringify(params)}`
    return { url }
  },
  get_parcels_count(params) {
    const url = `${API_URL}/parcels/count?${qs.stringify(params)}`
    return { url }
  },
  get_parcel_columns() {
    const url = `${API_URL}/parcels/columns`
    return { url }
  },
  get_parcel_views() {
    const url = `${API_URL}/views`
    return { url }
  }
}

export const apiRequest = (apiFunction, opts) => {
  const controller = new AbortController()
  const abort = controller.abort.bind(controller)
  const defaultOptions = {}
  const options = merge(defaultOptions, apiFunction(opts), {
    signal: controller.signal
  })
  const request = dispatchFetch.bind(null, options)
  return { abort, request }
}

export const dispatchFetch = async (options) => {
  const response = await fetch(options.url, options)
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const res = await response.json()
    const error = new Error(res.error || response.statusText)
    error.response = response
    throw error
  }
}
