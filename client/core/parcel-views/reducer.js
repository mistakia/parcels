import { Map } from 'immutable'

import { parcel_actions } from '@core/parcels'
import { parcel_view_actions } from './actions'
import { DEFAULT_PARCEL_VIEW_ID } from '@core/constants'

import * as table_constants from 'react-table/src/constants.mjs'

const initial_state = new Map({
  [DEFAULT_PARCEL_VIEW_ID]: new Map({
    view_id: DEFAULT_PARCEL_VIEW_ID,
    view_name: 'View #1',
    view_description: 'Default View',
    is_fetching: false,
    total_row_count: null,
    table_state: new Map({
      sorting: [],
      columns: [
        {
          accessorKey: 'path',
          column_name: 'path',
          table_name: 'parcels',
          header_label: 'Path',
          // footer_label: `Count ${data.length}`,
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'owner',
          column_name: 'owner',
          table_name: 'parcels',
          header_label: 'Owner',
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'll_gisacre',
          column_name: 'll_gisacre',
          table_name: 'parcels',
          header_label: 'Acreage',
          data_type: table_constants.TABLE_DATA_TYPES.NUMBER
        },
        {
          accessorKey: 'address',
          column_name: 'address',
          table_name: 'parcels',
          header_label: 'Address',
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'usecode',
          column_name: 'usecode',
          table_name: 'parcels',
          header_label: 'Use Code',
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'usedesc',
          column_name: 'usedesc',
          table_name: 'parcels',
          header_label: 'Use Description',
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'zoning',
          column_name: 'zoning',
          table_name: 'parcels',
          header_label: 'Zoning',
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'zoning_description',
          column_name: 'zoning_description',
          table_name: 'parcels',
          header_label: 'Zoning Description',
          data_type: table_constants.TABLE_DATA_TYPES.TEXT
        },
        {
          accessorKey: 'lat',
          column_name: 'lat',
          table_name: 'parcels',
          header_label: 'Latitude',
          data_type: table_constants.TABLE_DATA_TYPES.NUMBER
        },
        {
          accessorKey: 'lon',
          column_name: 'lon',
          table_name: 'parcels',
          header_label: 'Longitude',
          data_type: table_constants.TABLE_DATA_TYPES.NUMBER
        }
      ]
    })
  })
})

export function parcel_view_reducer(state = initial_state, { payload, type }) {
  switch (type) {
    case parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE:
      return state.setIn(
        [`${payload.view_id}`, 'table_state'],
        new Map(payload.view_table_state)
      )

    case parcel_actions.GET_PARCELS_PENDING:
      return state.setIn([`${payload.opts.view_id}`, 'is_fetching'], true)

    case parcel_actions.GET_PARCELS_FAILED:
    case parcel_actions.GET_PARCELS_FULFILLED:
      return state.setIn([`${payload.opts.view_id}`, 'is_fetching'], false)

    case parcel_actions.GET_PARCELS_COUNT_FULFILLED:
      return state.setIn(
        [`${payload.opts.view_id}`, 'total_row_count'],
        Number(payload.data.total_row_count)
      )

    case parcel_view_actions.GET_VIEWS_FULFILLED:
      return state.withMutations((map) => {
        payload.data.forEach((view) => {
          map.set(view.view_id, new Map(view))
        })
      })

    default:
      return state
  }
}
