import React from 'react'
import PropTypes from 'prop-types'
import { useMap, Marker, GeoJSON, Tooltip } from 'react-leaflet'

export default function ParcelsMap({
  parcels_bounding_box,
  parcel_features,
  load_heatmap_tile,
  heatmap_cells
}) {
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

  React.useEffect(() => {
    const bounds = [
      [parcels_bounding_box[1], parcels_bounding_box[0]],
      [parcels_bounding_box[3], parcels_bounding_box[2]]
    ]
    map.fitBounds(bounds)
  }, [
    parcels_bounding_box[0],
    parcels_bounding_box[1],
    parcels_bounding_box[2],
    parcels_bounding_box[3]
  ])

  if (!parcel_features.length) {
    return null
  }

  const items = parcel_features.map((feature, index) => {
    switch (feature.geometry.type) {
      case 'Point': {
        const position = [
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        ]
        return <Marker position={position} key={index} />
      }

      case 'MultiPolygon':
      case 'Polygon':
        return <GeoJSON data={feature} key={index} />

      default:
        throw new Error(`unknown geometry type: ${feature.geometry.type}`)
    }
  })

  heatmap_cells.forEach((cell, index) => {
    const { geojson, median_hardiness_temp_rank } = cell
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [geojson]
      }
    }
    const color = `hsl(${median_hardiness_temp_rank}, 100%, 50%)`
    const opacity = median_hardiness_temp_rank / 100
    items.push(
      <GeoJSON
        data={feature}
        key={`heatmap-${index}`}
        pathOptions={{ color, stroke: false, fillOpacity: opacity }}>
        <Tooltip sticky>{median_hardiness_temp_rank}</Tooltip>
      </GeoJSON>
    )
  })

  return <>{items}</>
}

ParcelsMap.propTypes = {
  parcels_bounding_box: PropTypes.array,
  parcel_features: PropTypes.array,
  load_heatmap_tile: PropTypes.func,
  heatmap_cells: PropTypes.array
}
