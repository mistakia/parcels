import React from 'react'
import { useMap } from 'react-leaflet'

export default function ParcelsMap() {
  const map = useMap()

  const usa_bounding_box = [
    [30.14512718337613, -129.94628906250003], // [south, west]
    [45.98169518512228, -66.66503906250001] // [north, east]
  ]

  React.useEffect(() => {
    map.fitBounds(usa_bounding_box)
  }, [])

  // const items = parcel_features.map((feature, index) => {
  //   switch (feature.geometry.type) {
  //     case 'Point': {
  //       const position = [
  //         feature.geometry.coordinates[1],
  //         feature.geometry.coordinates[0]
  //       ]
  //       return <Marker position={position} key={index} />
  //     }

  //     case 'MultiPolygon':
  //     case 'Polygon':
  //       return <GeoJSON data={feature} key={index} />

  //     default:
  //       throw new Error(`unknown geometry type: ${feature.geometry.type}`)
  //   }
  // })

  return null
}
