import express from 'express'
import Validator from 'fastest-validator'

import { get_column_coverage } from '#utils'

const v = new Validator({ haltOnFirstError: true })
const router = express.Router()

const sort_schema = {
  type: 'array',
  items: {
    type: 'object',
    props: {
      id: { type: 'string' },
      desc: { type: 'boolean' }
    }
  }
}
const sort_validator = v.compile(sort_schema)

router.get('/?', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const parcels_query = db('parcels')

    parcels_query.leftJoin(
      'parcels_geometry',
      'parcels.ll_uuid',
      'parcels_geometry.ll_uuid'
    )

    parcels_query.limit(100)

    if (req.query.sorting) {
      if (!sort_validator(req.query.sorting)) {
        return res.status(400).send({ error: 'invalid sort query param' })
      }

      for (const sort of req.query.sorting) {
        // convert sort.desc to boolean
        sort.desc = sort.desc === 'true'
        parcels_query.orderBy(sort.id, sort.desc ? 'desc' : 'asc')
      }
    }

    const parcels = await parcels_query

    res.status(200).send(parcels)
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

export default router
