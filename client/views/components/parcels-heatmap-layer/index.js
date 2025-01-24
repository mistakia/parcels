import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import ParcelsHeatmapLayer from './parcels-heatmap-layer'
import { get_parcels_heatmap_cells } from '@core/parcels-heatmap'

const mapStateToProps = createSelector(
  get_parcels_heatmap_cells,
  (heatmap_cells) => ({
    heatmap_cells
  })
)

export default connect(mapStateToProps)(ParcelsHeatmapLayer)
