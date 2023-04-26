import h3 from 'h3-js'

export function get_heatmap_cells(state) {
  const heatmaps = state.get('heatmaps')

  const items = []

  for (const heatmap of heatmaps.values()) {
    const cell_id = heatmap.h3_res4_id
    const geojson = h3.cellToBoundary(cell_id, true)
    items.push({
      geojson,
      median_hardiness_temp_rank: heatmap.median_hardiness_temp_rank
    })
  }

  return items
}
