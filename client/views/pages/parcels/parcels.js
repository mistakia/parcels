import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer } from 'react-leaflet'
import { createColumnHelper } from '@tanstack/react-table'

import ParcelsMap from '@components/parcels-map'
import Table from '@components/table/table'
import { TABLE_DATA_TYPES } from '@core/constants'

const columnHelper = createColumnHelper()

export default function ParcelsPage({ parcels }) {
  const data = parcels.toList().toJS()

  const columns = [
    columnHelper.accessor('path', {
      header_label: 'Path',
      footer_label: `Count ${data.length}`,
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('lat', {
      header_label: 'Latitude',
      data_type: TABLE_DATA_TYPES.NUMBER
    }),
    columnHelper.accessor('lon', {
      header_label: 'Longitude',
      data_type: TABLE_DATA_TYPES.NUMBER
    })
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <MapContainer style={{ height: '300px' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ParcelsMap />
      </MapContainer>
      <Table columns={columns} data={data} />
    </div>
  )
}

ParcelsPage.propTypes = {
  parcels: ImmutablePropTypes.map,
  parcels_bounding_box: PropTypes.array
}
