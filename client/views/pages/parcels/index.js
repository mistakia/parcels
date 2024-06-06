import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  parcel_actions,
  get_parcels,
  get_parcels_bounding_box
} from '@core/parcels'
import {
  parcel_view_actions,
  get_selected_parcel_view,
  get_all_parcel_views
} from '@core/parcel-views'
import { get_parcel_columns } from '@core/parcel-columns'
import { app_actions } from '@core/app'

import ParcelsPage from './parcels'

const mapStateToProps = createSelector(
  get_parcels,
  get_parcels_bounding_box,
  get_selected_parcel_view,
  get_parcel_columns,
  get_all_parcel_views,
  (
    parcels,
    parcels_bounding_box,
    selected_parcel_view,
    parcel_columns,
    all_parcel_views
  ) => ({
    parcels: parcels.toJS(),
    parcels_bounding_box,
    selected_parcel_view,
    all_parcel_views: all_parcel_views.toList().toJS(),
    parcel_columns
  })
)

const mapDispatchToProps = {
  save_parcels_view: parcel_view_actions.save_parcels_view,
  set_column_visible: parcel_view_actions.set_column_visible,
  set_column_hidden: parcel_view_actions.set_column_hidden,
  load_more_parcels: parcel_actions.load_more_parcels,
  set_selected_parcel_view_id: app_actions.set_selected_parcel_view_id,
  delete_parcels_view: parcel_view_actions.delete_parcels_view,
  parcel_view_state_changed: parcel_view_actions.parcel_view_state_changed
}

export default connect(mapStateToProps, mapDispatchToProps)(ParcelsPage)
