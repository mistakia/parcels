import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'

export default function ParcelsHeatmapLayer({ heatmap_cells }) {
  if (!heatmap_cells.length) {
    return null
  }

  return heatmap_cells.map((cell) => {
    const { geojson, avg_rank, cell_id } = cell
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [geojson]
      }
    }

    const color = get_color_for_value(avg_rank)

    return (
      <GeoJSON
        data={feature}
        key={cell_id}
        pathOptions={{
          fillColor: color.color,
          fillOpacity: color.opacity,
          weight: 1,
          color: color.color,
          opacity: color.opacity
        }}
      />
    )
  })
}

ParcelsHeatmapLayer.propTypes = {
  heatmap_cells: PropTypes.array.isRequired
}

function get_color_for_value(value) {
  const opacity = 0.05 + (value / 100) * 0.75

  return {
    color: 'hsl(240, 100%, 25%)',
    opacity
  }
}
