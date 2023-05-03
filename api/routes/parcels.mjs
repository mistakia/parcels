import express from 'express'

import { get_column_coverage, get_data_type, validators } from '#utils'

const router = express.Router()

router.get('/?', async (req, res) => {
  const { log, db } = req.app.locals
  try {
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

    parcels_query.limit(1000)

    if (req.query.sorting) {
      if (!validators.sort_validator(req.query.sorting)) {
        return res.status(400).send({ error: 'invalid sort query param' })
      }

      for (const sort of req.query.sorting) {
        sort.desc = sort.desc === 'true'
        parcels_query.orderByRaw(
          `${sort.id} ${sort.desc ? 'desc' : 'asc'} NULLS LAST`
        )
      }
    }

    const table_name_index = {}
    const join_table = (table_name) => {
      // if we haven't joined this table yet, join it
      if (
        !table_name_index[table_name] &&
        !default_parcel_tables.includes(table_name)
      ) {
        table_name_index[table_name] = true
        parcels_query.leftJoin(
          table_name,
          'parcels.ll_uuid',
          `${table_name}.ll_uuid`
        )
      }
    }

    if (req.query.columns) {
      if (!validators.columns_validator(req.query.columns)) {
        return res.status(400).send({ error: 'invalid columns query param' })
      }

      for (const column of req.query.columns) {
        if (default_parcel_columns.includes(column.column_name)) {
          continue
        }

        join_table(column.table_name)
        parcels_query.select(`${column.table_name}.${column.column_name}`)
      }
    }

    if (req.query.rank_aggregation) {
      if (!validators.rank_aggregation_validator(req.query.rank_aggregation)) {
        return res
          .status(400)
          .send({ error: 'invalid rank_aggregation query param' })
      }

      for (const rank_aggregation of req.query.rank_aggregation) {
        join_table(rank_aggregation.table_name)
      }

      const sum_string = req.query.rank_aggregation
        .map(
          (rank_aggregation) =>
            `(${rank_aggregation.weight} * ${rank_aggregation.table_name}.${rank_aggregation.column_name})`
        )
        .join(' + ')
      const total_weight = req.query.rank_aggregation.reduce(
        (acc, rank_aggregation) => acc + Number(rank_aggregation.weight),
        0
      )
      parcels_query.select(
        db.raw(`(${sum_string}) / ${total_weight} as rank_aggregation`)
      )
    }

    if (req.query.offset) {
      if (!validators.offset_validator(req.query.offset)) {
        return res.status(400).send({ error: 'invalid offset query param' })
      }

      parcels_query.offset(req.query.offset)
    }

    if (req.query.where) {
      if (!validators.where_validator(req.query.where)) {
        return res.status(400).send({ error: 'invalid where query param' })
      }

      for (const where of req.query.where) {
        if (where.operator === 'IS NULL') {
          parcels_query.whereNull(`${where.table_name}.${where.column_name}`)
        } else if (where.operator === 'IS NOT NULL') {
          parcels_query.whereNotNull(`${where.table_name}.${where.column_name}`)
        } else if (where.operator === 'IN') {
          parcels_query.whereIn(
            `${where.table_name}.${where.column_name}`,
            where.value
          )
        } else if (where.operator === 'NOT IN') {
          parcels_query.whereNotIn(
            `${where.table_name}.${where.column_name}`,
            where.value
          )
        } else if (where.operator === 'LIKE') {
          parcels_query.where(
            `${where.table_name}.${where.column_name}`,
            'LIKE',
            `%${where.value}%`
          )
        } else if (where.operator === 'NOT LIKE') {
          parcels_query.where(
            `${where.table_name}.${where.column_name}`,
            'NOT LIKE',
            `%${where.value}%`
          )
        } else if (where.value) {
          parcels_query.where(
            `${where.table_name}.${where.column_name}`,
            where.operator,
            where.value
          )
        }
      }
    }

    log(parcels_query.toString())

    const parcels = await parcels_query

    res.status(200).send(parcels)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

router.get('/count', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const parcels_query = db('parcels')

    if (req.query.where) {
      if (!validators.where_validator(req.query.where)) {
        return res.status(400).send({ error: 'invalid where query param' })
      }

      const table_name_index = {}
      for (const where of req.query.where) {
        // if we haven't joined this table yet, join it
        if (
          !table_name_index[where.table_name] &&
          where.table_name !== 'parcels'
        ) {
          table_name_index[where.table_name] = true
          parcels_query.leftJoin(
            where.table_name,
            'parcels.ll_uuid',
            `${where.table_name}.ll_uuid`
          )
        }

        if (where.operator === 'IS NULL') {
          parcels_query.whereNull(`${where.table_name}.${where.column_name}`)
        } else if (where.operator === 'IS NOT NULL') {
          parcels_query.whereNotNull(`${where.table_name}.${where.column_name}`)
        } else if (where.operator === 'IN') {
          parcels_query.whereIn(
            `${where.table_name}.${where.column_name}`,
            where.value
          )
        } else if (where.operator === 'NOT IN') {
          parcels_query.whereNotIn(
            `${where.table_name}.${where.column_name}`,
            where.value
          )
        } else if (where.operator === 'LIKE') {
          parcels_query.where(
            `${where.table_name}.${where.column_name}`,
            'LIKE',
            `%${where.value}%`
          )
        } else if (where.operator === 'NOT LIKE') {
          parcels_query.where(
            `${where.table_name}.${where.column_name}`,
            'NOT LIKE',
            `%${where.value}%`
          )
        } else if (where.value) {
          parcels_query.where(
            `${where.table_name}.${where.column_name}`,
            where.operator,
            where.value
          )
        }
      }
    }

    parcels_query.count('* as total_row_count')
    parcels_query.first()

    const data = await parcels_query

    res.status(200).send(data)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

router.get('/coverage', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const { column } = req.query
    if (!column) {
      return res.status(400).send({ error: 'missing column query param' })
    }

    const tables = [
      'parcels',
      'parcels_agriculture',
      'parcels_airport',
      'parcels_coastline',
      'parcels_density',
      'parcels_elevation',
      'parcels_geometry',
      'parcels_internet',
      'parcels_meta',
      'parcels_nature',
      'parcels_rank',
      'parcels_road',
      'parcels_viewshed'
    ]
    const query_columns = await db('INFORMATION_SCHEMA.COLUMNS')
      .select('COLUMN_NAME as column_name', 'TABLE_NAME as table_name')
      .whereIn('TABLE_NAME', tables)

    const matching_column = query_columns.find((p) => p.column_name === column)

    if (!matching_column) {
      return res.status(400).send({ error: `invalid column name: ${column}` })
    }

    const result = await get_column_coverage(matching_column)
    res.status(200).send(result)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

router.get('/columns', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const tables = [
      'parcels',
      'parcels_agriculture',
      'parcels_airport',
      'parcels_coastline',
      'parcels_density',
      'parcels_elevation',
      'parcels_geometry',
      'parcels_internet',
      'parcels_meta',
      'parcels_nature',
      'parcels_rank',
      'parcels_road',
      'parcels_viewshed'
    ]
    const query_columns = await db('information_schema.columns')
      .select('column_name', 'table_name', 'data_type')
      .whereIn('table_name', tables)

    const column_index = {}
    const unique_columns = []
    for (const column of query_columns) {
      if (column_index[column.column_name]) {
        continue
      }

      const data_type = get_data_type(column.data_type)
      if (!data_type) {
        log(`unknown data type: ${column.data_type}`)
      }

      column_index[column.column_name] = true
      unique_columns.push({
        ...column,
        data_type,
        accessorKey: column.column_name,
        header_label: column.column_name
      })
    }

    res.status(200).send(unique_columns)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
