import { createSelector } from 'reselect'
import { cellToBoundary } from 'h3-js'

export const get_parcels_heatmap = (state) => state.get('parcels_heatmap')

export const get_parcels_heatmap_cells = createSelector(
  [get_parcels_heatmap],
  (heatmap_data) => {
    if (!heatmap_data?.size) {
      return []
    }

    return Array.from(heatmap_data).map((hex) => {
      const geojson = cellToBoundary(hex.h3_index, true)
      return {
        cell_id: hex.h3_index,
        geojson,
        avg_rank: hex.avg_rank
      }
    })
  }
)
