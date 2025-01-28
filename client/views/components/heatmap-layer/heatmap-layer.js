import React from 'react'
import PropTypes from 'prop-types'
import { useMap, GeoJSON, Tooltip } from 'react-leaflet'

export default function HeatmapLayer({ heatmap_cells, load_heatmap_tile }) {
  const map = useMap()
  const [display_metric, set_display_metric] = React.useState(
    'median_hardiness_temp_rank'
  )

  // Calculate min and max parcels count once when data changes
  const { min_parcels, max_parcels } = React.useMemo(() => {
    const counts = heatmap_cells.map((cell) => cell.parcels_count)
    return {
      min_parcels: Math.min(...counts),
      max_parcels: Math.max(...counts)
    }
  }, [heatmap_cells])

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

  const get_color_and_opacity = (cell) => {
    if (display_metric === 'median_hardiness_temp_rank') {
      const color = `hsl(${cell.median_hardiness_temp_rank}, 100%, 50%)`
      const opacity = cell.median_hardiness_temp_rank * 0.006
      return { color, opacity }
    } else {
      // Scale parcels_count between min and max values
      const normalized_count =
        (cell.parcels_count - min_parcels) / (max_parcels - min_parcels)

      const lightness = 80 - normalized_count * 60
      const color = `hsl(0, 0%, ${lightness}%)`
      const opacity = 0.5 + normalized_count * 0.5 // Ensures visibility even for low values
      return { color, opacity }
    }
  }

  const items = heatmap_cells.map((cell) => {
    const { geojson, cell_id } = cell
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [geojson]
      }
    }
    const { color, opacity } = get_color_and_opacity(cell)
    const tooltip_value =
      display_metric === 'median_hardiness_temp_rank'
        ? cell.median_hardiness_temp_rank
        : cell.parcels_count

    return (
      <GeoJSON
        data={feature}
        key={cell_id}
        pathOptions={{ color, stroke: false, fillOpacity: opacity }}>
        <Tooltip sticky>{tooltip_value}</Tooltip>
      </GeoJSON>
    )
  })

  return (
    <>
      <div
        className='heatmap-controls'
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
        <select
          value={display_metric}
          onChange={(e) => set_display_metric(e.target.value)}>
          <option value='median_hardiness_temp_rank'>
            Hardiness Temperature
          </option>
          <option value='parcels_count'>Parcels Count</option>
        </select>
      </div>
      {items}
    </>
  )
}

HeatmapLayer.propTypes = {
  heatmap_cells: PropTypes.array,
  load_heatmap_tile: PropTypes.func
}
