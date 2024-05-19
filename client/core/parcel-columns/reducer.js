import { Map } from 'immutable'
import * as table_constants from 'react-table/src/constants.mjs'

import { parcel_column_actions } from './actions'

export function parcel_column_reducer(state = new Map(), { payload, type }) {
  switch (type) {
    case parcel_column_actions.GET_PARCEL_COLUMNS_FULFILLED:
      return state.withMutations((map) => {
        payload.data.forEach((column) => {
          map.set(column.column_name, {
            column_id: column.column_name,
            ...column
          })
        })

        map.set('rank_aggregation', {
          column_id: 'rank_aggregation',
          accessorKey: 'rank_aggregation',
          data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
          header_label: 'Rank'
        })
      })

    default:
      return state
  }
}
