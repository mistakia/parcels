import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { get_parcels_bounding_box, get_parcel_features } from '@core/parcels'

import ParcelsMap from './parcels-map'
import { heatmap_actions, get_heatmap_cells } from '@core/heatmaps'

const mapStateToProps = createSelector(
  get_parcels_bounding_box,
  get_parcel_features,
  get_heatmap_cells,
  (parcels_bounding_box, parcel_features, heatmap_cells) => ({
    parcels_bounding_box,
    parcel_features,
    heatmap_cells
  })
)

const map_dispatch_to_props = {
  load_heatmap_tile: heatmap_actions.load_heatmap_tile
}

export default connect(mapStateToProps, map_dispatch_to_props)(ParcelsMap)
