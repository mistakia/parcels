/* global AbortController, fetch */

import qs from 'qs'
import merge from 'merge-options'

import { API_URL } from '@core/constants'

const POST = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  get_parcels(params) {
    const url = `${API_URL}/parcels?${qs.stringify(params)}`
    return { url }
  },
  get_parcels_heatmap(params) {
    const url = `${API_URL}/parcels/heatmap?${qs.stringify(params)}`
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
  },
  post_parcel_view(data) {
    const url = `${API_URL}/views`
    return { url, ...POST(data) }
  },
  delete_parcels_view({ view_id }) {
    const url = `${API_URL}/views/${view_id}`
    return { url, method: 'DELETE' }
  },
  get_heatmap_tile(params) {
    const url = `${API_URL}/heatmaps?${qs.stringify(params)}`
    return { url }
  },
  get_parcel({ ll_uuid }) {
    const url = `${API_URL}/parcels/${ll_uuid}`
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
