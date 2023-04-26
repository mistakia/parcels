import React from 'react'
import PropTypes from 'prop-types'
import { useMap, GeoJSON, Tooltip } from 'react-leaflet'

export default function HeatmapLayer({ heatmap_cells, load_heatmap_tile }) {
  const map = useMap()

  const get_markers = async () => {
    const { _northEast, _southWest } = map.getBounds()
    const { lat: ne_lat, lng: ne_lon } = _northEast
    const { lat: sw_lat, lng: sw_lon } = _southWest

    load_heatmap_tile({ ne_lat, ne_lon, sw_lat, sw_lon })
  }

  React.useEffect(() => {
    map.addEventListener('load', get_markers)
    map.addEventListener('moveend', get_markers)

    return () => {
      map.removeEventListener('moveend')
      map.removeEventListener('load')
    }
  }, [])

  const items = heatmap_cells.map((cell) => {
    const { geojson, median_hardiness_temp_rank, cell_id } = cell
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [geojson]
      }
    }
    const color = `hsl(${median_hardiness_temp_rank}, 100%, 50%)`
    const opacity = median_hardiness_temp_rank * 0.006
    return (
      <GeoJSON
        data={feature}
        key={cell_id}
        pathOptions={{ color, stroke: false, fillOpacity: opacity }}>
        <Tooltip sticky>{median_hardiness_temp_rank}</Tooltip>
      </GeoJSON>
    )
  })

  return <>{items}</>
}

HeatmapLayer.propTypes = {
  heatmap_cells: PropTypes.array,
  load_heatmap_tile: PropTypes.func
}
