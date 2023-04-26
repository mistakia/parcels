import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import HeatmapLayer from './heatmap-layer'
import { heatmap_actions, get_heatmap_cells } from '@core/heatmaps'

const mapStateToProps = createSelector(get_heatmap_cells, (heatmap_cells) => ({
  heatmap_cells
}))

const map_dispatch_to_props = {
  load_heatmap_tile: heatmap_actions.load_heatmap_tile
}

export default connect(mapStateToProps, map_dispatch_to_props)(HeatmapLayer)
