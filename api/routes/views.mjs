import express from 'express'
import ed25519 from '@trashman/ed25519-blake2b'

import { validators } from '#utils'

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

    const views = await query

    res.status(200).send(views)
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

    if (!user_signature) {
      return res.status(400).send({ error: 'missing signature' })
    }

    const data = {
      view_name,
      view_description,
      table_state
    }
    const data_hash = ed25519.hash(JSON.stringify(data))

    let is_valid = false

    if (view_id) {
      const existing_view = await db('database_table_views')
        .where({ view_id })
        .first()

      if (!existing_view) {
        return res.status(404).send({ error: 'view_id not found' })
      }

      is_valid = ed25519.verify(user_signature, data_hash, existing_view.user_public_key)
      if (!is_valid) {
        return res.status(400).send({ error: 'invalid signature' })
      }

      await db('database_table_views')
        .where({ view_id })
        .update({
          view_name,
          view_description,
          table_state: JSON.stringify(table_state),
          user_signature
        })
    } else {
      is_valid = ed25519.verify(user_signature, data_hash, user_public_key)
      if (!is_valid) {
        return res.status(400).send({ error: 'invalid signature' })
      }

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

    if (!view) {
      return res.status(404).send({ error: 'view not found' })
    }

    res.status(200).send(view)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})
router.delete('/:view_id', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const { view_id, user_signature, user_public_key } = req.params

    if (!validators.view_id_validator(view_id)) {
      return res.status(400).send({ error: 'invalid view_id' })
    }

    if (!user_signature) {
      return res.status(400).send({ error: 'missing user_signature' })
    }

    if (!user_public_key) {
      return res.status(400).send({ error: 'missing user_public_key' })
    }

    const data_hash = ed25519.hash(view_id)
    const is_valid = ed25519.verify(user_signature, data_hash, user_public_key)
    if (!is_valid) {
      return res.status(400).send({ error: 'invalid signature' })
    }

    await db('database_table_views')
      .where({
        view_id,
        user_public_key
      })
      .del()

    res.status(200).send({ success: true })
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
