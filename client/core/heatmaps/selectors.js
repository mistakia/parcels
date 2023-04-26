import h3 from 'h3-js'
import { createSelector } from 'reselect'

export const get_heatmap_cells = createSelector(
  [(state) => state.get('heatmaps')],
  (heatmaps) => {
    const items = []

    for (const heatmap of heatmaps.values()) {
      const cell_id = heatmap.h3_res4_id
      const geojson = h3.cellToBoundary(cell_id, true)
      items.push({
        cell_id,
        geojson,
        median_hardiness_temp_rank: heatmap.median_hardiness_temp_rank
      })
    }

    return items
  },
  {
    memoizeOptions: {
      equalityCheck: (a, b) => a.size === b.size
    }
  }
)
