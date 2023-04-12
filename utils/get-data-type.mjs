import * as table_constants from '../../react-table/src/constants.mjs'

export default function get_data_type(column_data_type) {
  switch (column_data_type) {
    case 'integer':
    case 'bigint':
    case 'numeric':
    case 'real':
    case 'double precision':
    case 'smallint':
    case 'smallserial':
    case 'serial':
    case 'bigserial':
      return table_constants.TABLE_DATA_TYPES.NUMBER

    case 'character varying':
    case 'text':
      return table_constants.TABLE_DATA_TYPES.TEXT

    case 'json':
      return table_constants.TABLE_DATA_TYPES.JSON

    case 'boolean':
      return table_constants.TABLE_DATA_TYPES.BOOLEAN

    case 'date':
    case 'timestamp without time zone':
    case 'timestamp with time zone':
      return table_constants.TABLE_DATA_TYPES.DATE

    default:
      return null
  }
}
