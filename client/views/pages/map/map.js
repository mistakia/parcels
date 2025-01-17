import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import ParcelsMap from '@components/parcels-map'
import HeatmapLayer from '@components/heatmap-layer'

export default function MapPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer style={{ height: '100%', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <HeatmapLayer />
        <ParcelsMap />
      </MapContainer>
    </div>
  )
}
