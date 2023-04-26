import React from 'react'
import PropTypes from 'prop-types'
import { useMap } from 'react-leaflet'

export default function ParcelsMap({ parcels_bounding_box }) {
  const map = useMap()

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

ParcelsMap.propTypes = {
  parcels_bounding_box: PropTypes.array
}
