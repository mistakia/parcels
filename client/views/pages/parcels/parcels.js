import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Parcel from '@components/parcel'

export default function ParcelsPage({ parcels }) {
  const rows = parcels
    .toList()
    .map((parcel, index) => <Parcel parcel={parcel} key={index} />)
  return (
    <>
      <h1>{parcels.size} Parcels loaded</h1>
      {rows}
    </>
  )
}

ParcelsPage.propTypes = {
  parcels: ImmutablePropTypes.map
}
