import debug from 'debug'

import db from '#db'
import { column_definitions } from '#common'

const log = debug('get_parcels_query_results')

export function build_parcels_query({
  splits = [],
  where = [],
  columns = [],
  prefix_columns = [],
  sort = [],
  offset = 0,
  limit = 1000,
  rank_aggregation = [],
  ignore_limit = false
}) {
  const parcels_query = db('parcels')

  const default_parcel_tables = ['parcels', 'parcels_geometry']
  const default_parcel_columns = ['path', 'll_uuid', 'lat', 'lon']

  for (const column of default_parcel_columns) {
    parcels_query.select(`parcels.${column}`)
  }

  parcels_query.leftJoin(
    'parcels_geometry',
    'parcels.ll_uuid',
    'parcels_geometry.ll_uuid'
  )
  parcels_query.select('parcels_geometry.coordinates')

  if (!ignore_limit) {
    parcels_query.limit(limit)
  }

  for (const sort_item of sort) {
    const { column_id, desc } = sort_item
    parcels_query.orderByRaw(`${column_id} ${desc ? 'desc' : 'asc'} NULLS LAST`)
  }

  const table_name_index = {}
  const join_table = ({ table_name, params }) => {
    // if we haven't joined this table yet, join it
    if (
      !table_name_index[table_name] &&
      !default_parcel_tables.includes(table_name)
    ) {
      table_name_index[table_name] = true
      if (params?.year) {
        const years = Array.isArray(params.year) ? params.year : [params.year]

        parcels_query.leftJoin(table_name, function () {
          this.on('parcels.ll_uuid', '=', `${table_name}.ll_uuid`).on(
            db.raw(`${table_name}.election_year IN (${years.join(',')})`)
          )
        })
      } else {
        parcels_query.leftJoin(
          table_name,
          'parcels.ll_uuid',
          `${table_name}.ll_uuid`
        )
      }
    }
  }

  for (const column of columns) {
    const column_id = typeof column === 'string' ? column : column.column_id

    if (column_id === 'rank_aggregation') {
      continue
    }

    const column_definition = column_definitions.find(
      (def) => def.column_id === column_id
    )

    if (!column_definition) {
      log(`invalid column id: ${column_id}`)
      continue
    }

    const { column_name, table_name } = column_definition

    if (default_parcel_columns.includes(column_name)) {
      continue
    }

    join_table({ table_name, params: column?.params })
    parcels_query.select(`${table_name}.${column_name}`)
  }

  const rank_aggregation_strings = []
  let total_weight = 0

  for (const rank_aggregation_item of rank_aggregation) {
    const { column_id } = rank_aggregation_item
    const column_definition = column_definitions.find(
      (def) => def.column_id === column_id
    )
    if (!column_definition) {
      log(`invalid column id: ${column_id}`)
      continue
    }

    const column_name = column_definition.column_name
    const table_name = column_definition.table_name

    join_table({
      table_name,
      params: rank_aggregation_item?.params
    })

    rank_aggregation_strings.push(
      `(${rank_aggregation_item.weight} * ${table_name}.${column_name})`
    )
    total_weight += Number(rank_aggregation_item.weight)
  }

  if (rank_aggregation_strings.length) {
    const sum_string = rank_aggregation_strings.join(' + ')

    parcels_query.select(
      db.raw(`(${sum_string}) / ${total_weight} as rank_aggregation`)
    )
  }

  if (offset) {
    parcels_query.offset(offset)
  }

  for (const where_item of where) {
    const { column_id, operator, value } = where_item
    const column_definition = column_definitions.find(
      (def) => def.column_id === column_id
    )
    if (!column_definition) {
      log(`invalid column id: ${column_id}`)
      continue
    }

    const { column_name, table_name } = column_definition

    if (operator === 'IS NULL') {
      parcels_query.whereNull(`${table_name}.${column_name}`)
    } else if (operator === 'IS NOT NULL') {
      parcels_query.whereNotNull(`${table_name}.${column_name}`)
    } else if (operator === 'IN') {
      parcels_query.whereIn(`${table_name}.${column_name}`, value)
    } else if (operator === 'NOT IN') {
      parcels_query.whereNotIn(`${table_name}.${column_name}`, value)
    } else if (operator === 'LIKE') {
      parcels_query.where(`${table_name}.${column_name}`, 'LIKE', `%${value}%`)
    } else if (operator === 'NOT LIKE') {
      parcels_query.where(
        `${table_name}.${column_name}`,
        'NOT LIKE',
        `%${value}%`
      )
    } else if (value) {
      parcels_query.where(`${table_name}.${column_name}`, operator, value)
    }
  }

  log(parcels_query.toString())

  return parcels_query
}

export default async function get_parcels_query_results(params) {
  const query = build_parcels_query(params)
  return query
}
