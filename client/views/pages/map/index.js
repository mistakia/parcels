import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { parcels_heatmap_actions } from '@core/parcels-heatmap'
import { get_selected_parcel_view } from '@core/parcel-views'
import MapPage from './map'

const mapStateToProps = createSelector(
  get_selected_parcel_view,
  (selected_parcel_view) => ({
    selected_parcel_view
  })
)

const mapDispatchToProps = {
  load_parcels_heatmap: parcels_heatmap_actions.load_parcels_heatmap
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)
