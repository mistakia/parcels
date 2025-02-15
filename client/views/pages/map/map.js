import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer } from 'react-leaflet'

import ParcelsMap from '@components/parcels-map'
import ParcelsHeatmapLayer from '@components/parcels-heatmap-layer'
import HeatmapLayer from '@components/heatmap-layer'
import CountyBoundaries from '@components/county-boundaries'

export default function MapPage({
  load_parcels_heatmap,
  selected_parcel_view
}) {
  useEffect(() => {
    load_parcels_heatmap()
  }, [load_parcels_heatmap, selected_parcel_view.view_id])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer style={{ height: '100%', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <CountyBoundaries />
        <ParcelsHeatmapLayer />
        <HeatmapLayer />
        <ParcelsMap />
      </MapContainer>
    </div>
  )
}

MapPage.propTypes = {
  load_parcels_heatmap: PropTypes.func.isRequired,
  selected_parcel_view: PropTypes.object.isRequired
}
