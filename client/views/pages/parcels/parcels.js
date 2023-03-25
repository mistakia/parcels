import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer } from 'react-leaflet'

import ParcelsMap from '@components/parcels-map'
import Table from '@components/table/table'

export default function ParcelsPage({
  parcels,
  selected_parcel_view,
  set_parcels_view_table_state,
  parcel_columns
}) {
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
        data={parcels.toJS()}
        on_table_change={on_table_change}
        table_state={selected_parcel_view.table_state}
        all_columns={parcel_columns}
      />
    </div>
  )
}

ParcelsPage.propTypes = {
  parcels: ImmutablePropTypes.list,
  parcels_bounding_box: PropTypes.array,
  selected_parcel_view: ImmutablePropTypes.record,
  set_parcels_view_table_state: PropTypes.func,
  parcel_columns: ImmutablePropTypes.list
}
