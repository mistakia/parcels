import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  parcel_actions,
  get_parcels,
  get_parcels_bounding_box
} from '@core/parcels'
import {
  parcel_view_actions,
  get_selected_parcel_view
} from '@core/parcel-views'
import { get_parcel_columns } from '@core/parcel-columns'

import ParcelsPage from './parcels'

const mapStateToProps = createSelector(
  get_parcels,
  get_parcels_bounding_box,
  get_selected_parcel_view,
  get_parcel_columns,
  (parcels, parcels_bounding_box, selected_parcel_view, parcel_columns) => ({
    parcels,
    parcels_bounding_box,
    selected_parcel_view,
    parcel_columns
  })
)

const mapDispatchToProps = {
  set_parcels_view_table_state:
    parcel_view_actions.set_parcels_view_table_state,
  set_column_visible: parcel_view_actions.set_column_visible,
  set_column_hidden: parcel_view_actions.set_column_hidden,
  load_more_parcels: parcel_actions.load_more_parcels
}

export default connect(mapStateToProps, mapDispatchToProps)(ParcelsPage)
