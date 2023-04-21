import express from 'express'

import { get_data_type, validators } from '#utils'

const router = express.Router()

router.get('/?', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const query = db('database_table_views').where({
      table_name: 'parcels'
    })

    if (req.query.user_public_key) {
      query.where({
        user_public_key: req.query.user_public_key
      })
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

    const results = await query
    const database_table_views = results.map((view) => ({
      ...view,
      all_columns: unique_columns
    }))

    res.status(200).send(database_table_views)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

router.post('/?', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const {
      view_id,
      view_name,
      table_state,
      view_description,
      user_public_key,
      user_signature
    } = req.body

    if (!validators.view_name_validator(view_name)) {
      return res.status(400).send({ error: 'invalid view_name' })
    }

    if (!validators.view_description_validator(view_description)) {
      return res.status(400).send({ error: 'invalid view_description' })
    }

    if (!validators.table_state_validator(table_state)) {
      return res.status(400).send({ error: 'invalid table_state' })
    }

    // TODO check signature

    if (view_id) {
      await db('database_table_views')
        .where({
          view_id
        })
        .update({
          view_name,
          view_description,
          table_state: JSON.stringify(table_state),
          user_signature
        })
    } else {
      await db('database_table_views')
        .insert({
          view_name,
          view_description,
          table_state: JSON.stringify(table_state),
          table_name: 'parcels',
          user_public_key,
          user_signature
        })
        .onConflict(['view_name', 'table_name', 'user_public_key'])
        .merge()
    }

    const view = await db('database_table_views')
      .where({
        view_name,
        user_public_key
      })
      .first()

    res.status(200).send(view)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

router.delete('/:view_id', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const { view_id, user_signature } = req.params

    if (!validators.view_id_validator(view_id)) {
      return res.status(400).send({ error: 'invalid view_id' })
    }

    if (!user_signature) {
      return res.status(400).send({ error: 'invalid user_signature' })
    }

    // TODO check signature

    await db('database_table_views')
      .where({
        view_id
      })
      .del()

    res.status(200).send({ success: true })
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
