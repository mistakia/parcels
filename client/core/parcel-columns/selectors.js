import React from 'react'
import * as table_constants from 'react-table/src/constants.mjs'
import ParcelsLLUUID from '@views/components/parcels-ll-uuid'

export function get_parcel_columns(state) {
  const columns = state.get('parcel_columns').toJS()

  columns.ll_uuid = {
    column_title: 'LL UUID',
    header_label: 'LL UUID',
    component: React.memo(ParcelsLLUUID),
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorFn: (row) => row.ll_uuid // TODO expecting ({ row })
  }

  return columns
}
