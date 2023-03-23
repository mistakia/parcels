import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { get_parcels, get_parcels_bounding_box } from '@core/parcels'
import {
  parcel_view_actions,
  get_selected_parcel_view
} from '@core/parcel-views'

import ParcelsPage from './parcels'

const mapStateToProps = createSelector(
  get_parcels,
  get_parcels_bounding_box,
  get_selected_parcel_view,
  (parcels, parcels_bounding_box, selected_parcel_view) => ({
    parcels,
    parcels_bounding_box,
    selected_parcel_view
  })
)

const mapDispatchToProps = {
  set_parcels_view_table_state: parcel_view_actions.set_parcels_view_table_state
}

export default connect(mapStateToProps, mapDispatchToProps)(ParcelsPage)
