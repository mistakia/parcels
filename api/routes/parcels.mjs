import express from 'express'

import { get_column_coverage, validators } from '#utils'
import { column_definitions, get_parcels_query_results } from '#common'

const router = express.Router()

router.get('/?', async (req, res) => {
  const { log } = req.app.locals
  try {
    if (req.query.sort) {
      if (!validators.sort_validator(req.query.sort)) {
        return res.status(400).send({ error: 'invalid sort query param' })
      }
    }

    if (req.query.columns) {
      if (!validators.columns_validator(req.query.columns)) {
        return res.status(400).send({ error: 'invalid columns query param' })
      }
    }

    if (req.query.rank_aggregation) {
      if (!validators.rank_aggregation_validator(req.query.rank_aggregation)) {
        return res
          .status(400)
          .send({ error: 'invalid rank_aggregation query param' })
      }
    }

    if (req.query.offset) {
      if (!validators.offset_validator(req.query.offset)) {
        return res.status(400).send({ error: 'invalid offset query param' })
      }
    }

    if (req.query.where) {
      if (!validators.where_validator(req.query.where)) {
        return res.status(400).send({ error: 'invalid where query param' })
      }
    }

    const parcels = await get_parcels_query_results(req.query)
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
        let column_name
        let table_name
        if (where.column_id) {
          const column_definition = column_definitions.find(
            (def) => def.column_id === where.column_id
          )
          if (!column_definition) {
            return res
              .status(400)
              .send({ error: `invalid column id: ${where.column_id}` })
          }
          column_name = column_definition.column_name
          table_name = column_definition.table_name
        } else {
          column_name = where.column_name
          table_name = where.table_name
        }

        // if we haven't joined this table yet, join it
        if (!table_name_index[table_name] && table_name !== 'parcels') {
          table_name_index[table_name] = true
          parcels_query.leftJoin(
            table_name,
            'parcels.ll_uuid',
            `${table_name}.ll_uuid`
          )
        }

        if (where.operator === 'IS NULL') {
          parcels_query.whereNull(`${table_name}.${column_name}`)
        } else if (where.operator === 'IS NOT NULL') {
          parcels_query.whereNotNull(`${table_name}.${column_name}`)
        } else if (where.operator === 'IN') {
          parcels_query.whereIn(`${table_name}.${column_name}`, where.value)
        } else if (where.operator === 'NOT IN') {
          parcels_query.whereNotIn(`${table_name}.${column_name}`, where.value)
        } else if (where.operator === 'LIKE') {
          parcels_query.where(
            `${table_name}.${column_name}`,
            'LIKE',
            `%${where.value}%`
          )
        } else if (where.operator === 'NOT LIKE') {
          parcels_query.where(
            `${table_name}.${column_name}`,
            'NOT LIKE',
            `%${where.value}%`
          )
        } else if (where.value) {
          parcels_query.where(
            `${table_name}.${column_name}`,
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
      'parcels_election_results',
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
  const { log } = req.app.locals
  try {
    res.status(200).send(column_definitions)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
