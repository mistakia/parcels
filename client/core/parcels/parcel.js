import { Map } from 'immutable'

export const Parcel = (params) =>
  new Map({
    coordinates: [],
    path: null,
    ll_uuid: null,
    ...params
  })
