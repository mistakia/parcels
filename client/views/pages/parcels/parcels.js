import React from 'react'
import { List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer } from 'react-leaflet'

import ParcelsMap from '@components/parcels-map'
import Table from 'react-table/index.js'

export default function ParcelsPage({
  parcels,
  selected_parcel_view,
  set_parcels_view_table_state,
  parcel_columns,
  load_more_parcels
}) {
  const on_table_change = (table_state) =>
    set_parcels_view_table_state({
      view_id: selected_parcel_view.get('id'),
      view_table_state: table_state
    })

  React.useEffect(() => {
    if (selected_parcel_view.size) {
      const view_id = selected_parcel_view.get('id')
      load_more_parcels({ view_id })
    }
  }, [])

  const table_state = selected_parcel_view.get('table_state')
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        overflowY: 'scroll'
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
        table_state={table_state}
        all_columns={parcel_columns}
        selected_view={selected_parcel_view}
        select_view={(view) => {
          console.log('select_view', view) // TODO: select view
        }}
        fetch_more={load_more_parcels}
        total_rows_fetched={parcels.size}
        total_row_count={selected_parcel_view.get('total_row_count', null)}
        is_fetching={selected_parcel_view.get('is_fetching', false)}
        views={new List()}
      />
    </div>
  )
}

ParcelsPage.propTypes = {
  parcels: ImmutablePropTypes.list,
  parcels_bounding_box: PropTypes.array,
  selected_parcel_view: ImmutablePropTypes.map,
  set_parcels_view_table_state: PropTypes.func,
  parcel_columns: ImmutablePropTypes.list,
  load_more_parcels: PropTypes.func
}
