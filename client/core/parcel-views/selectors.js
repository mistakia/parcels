import { Map } from 'immutable'
import { get_app } from '@core/app'

export function get_selected_parcel_view(state) {
  const { selected_parcel_view_id } = get_app(state)
  const selected_parcel_view = state
    .getIn(['parcel_views', `${selected_parcel_view_id}`], new Map())
    .set('editable', true)
    .toJS()

  return selected_parcel_view
}

export function get_all_parcel_views(state) {
  return state.get('parcel_views')
}
