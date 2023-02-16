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
  }, [parcels_bounding_box])

  return null
}

ParcelsMap.propTypes = {
  parcels_bounding_box: PropTypes.array
}
