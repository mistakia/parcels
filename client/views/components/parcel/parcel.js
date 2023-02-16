import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import './parcel.styl'

export default function Parcel({ parcel }) {
  return (
    <div className='parcel'>
      <div>{parcel.path}</div>
    </div>
  )
}

Parcel.propTypes = {
  parcel: ImmutablePropTypes.record
}
