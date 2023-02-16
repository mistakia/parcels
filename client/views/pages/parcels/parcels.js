import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer } from 'react-leaflet'

import Parcel from '@components/parcel'
import ParcelsMap from '@components/parcels-map'

export default function ParcelsPage({ parcels }) {
  const rows = parcels
    .toList()
    .map((parcel, index) => <Parcel parcel={parcel} key={index} />)

  return (
    <>
      <h1>{parcels.size} Parcels loaded</h1>
      <MapContainer style={{ height: '300px' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ParcelsMap />
      </MapContainer>
      {rows}
    </>
  )
}

ParcelsPage.propTypes = {
  parcels: ImmutablePropTypes.map,
  parcels_bounding_box: PropTypes.array
}
