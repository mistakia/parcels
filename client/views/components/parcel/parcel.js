import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import './parcel.styl'

export default function Parcel({ parcel }) {
  const position = [parcel.lat, parcel.lon]
  return (
    <div className='parcel'>
      <div>{parcel.path}</div>
      <MapContainer center={position} zoom={13} style={{ height: '46px' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

Parcel.propTypes = {
  parcel: ImmutablePropTypes.record
}
