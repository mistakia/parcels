import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer } from 'react-leaflet'
import { createColumnHelper } from '@tanstack/react-table'

import ParcelsMap from '@components/parcels-map'
import Table from '@components/table/table'
import { TABLE_DATA_TYPES } from '@core/constants'

const columnHelper = createColumnHelper()

export default function ParcelsPage({
  parcels,
  selected_parcel_view,
  set_parcels_view_table_state
}) {
  const data = parcels.toList().toJS()

  const columns = [
    columnHelper.accessor('path', {
      header_label: 'Path',
      footer_label: `Count ${data.length}`,
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('owner', {
      header_label: 'Owner',
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('ll_gisacre', {
      header_label: 'Acreage',
      data_type: TABLE_DATA_TYPES.NUMBER
    }),
    columnHelper.accessor('address', {
      header_label: 'Address',
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('usecode', {
      header_label: 'Use Code',
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('usedesc', {
      header_label: 'Use Description',
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('zoning', {
      header_label: 'Zoning',
      data_type: TABLE_DATA_TYPES.TEXT
    }),
    columnHelper.accessor('zoning_description', {
      header_label: 'Zoning Description',
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

  const on_table_change = (table_state) =>
    set_parcels_view_table_state({
      view_id: selected_parcel_view.id,
      view_table_state: table_state
    })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div style={{ position: 'sticky', left: '0', width: '1px' }}>
        <MapContainer
          style={{ height: '300px', width: `${window.innerWidth}px` }}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <ParcelsMap />
        </MapContainer>
      </div>
      <Table
        columns={columns}
        data={data}
        on_table_change={on_table_change}
        table_state={selected_parcel_view.table_state}
      />
    </div>
  )
}

ParcelsPage.propTypes = {
  parcels: ImmutablePropTypes.map,
  parcels_bounding_box: PropTypes.array,
  selected_parcel_view: ImmutablePropTypes.record,
  set_parcels_view_table_state: PropTypes.func
}
