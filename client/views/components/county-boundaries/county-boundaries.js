import React, { useEffect, useState } from 'react'
import { GeoJSON } from 'react-leaflet'

import { BASE_URL } from '@core/constants'

export default function CountyBoundaries() {
  const [county_data, set_county_data] = useState(null)

  useEffect(() => {
    const load_counties = async () => {
      try {
        const response = await fetch(`${BASE_URL}/data/us_counties.geo.json`)
        const data = await response.json()
        set_county_data(data)
      } catch (error) {
        console.error('Failed to load county boundaries:', error)
      }
    }

    load_counties()
  }, [])

  if (!county_data) {
    return null
  }

  const style = {
    weight: 1,
    opacity: 0.5,
    color: '#666',
    fillOpacity: 0
  }

  const on_each_feature = (feature, layer) => {
    // Add tooltip to the layer
    layer.bindTooltip(feature.properties.NAME + ' County')

    layer.on({
      mouseover: (event) => {
        const layer = event.target
        layer.setStyle({
          fillOpacity: 0.3,
          fillColor: '#666'
        })
      },
      mouseout: (event) => {
        const layer = event.target
        layer.setStyle({
          fillOpacity: 0
        })
      }
    })
  }

  return (
    <GeoJSON data={county_data} style={style} onEachFeature={on_each_feature} />
  )
}
