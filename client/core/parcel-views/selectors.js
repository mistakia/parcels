import { Map } from 'immutable'
import { getApp } from '@core/app'

export function get_selected_parcel_view(state) {
  const { selected_parcel_view_id } = getApp(state)
  return state
    .getIn(['parcel_views', `${selected_parcel_view_id}`], new Map())
    .toJS()
}

export function get_all_parcel_views(state) {
  return state.get('parcel_views')
}
