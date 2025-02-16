import express from 'express'

import { validators, get_parcel } from '#utils'

const router = express.Router({ mergeParams: true })

router.get('/?', async (req, res) => {
  const { log } = req.app.locals
  try {
    const { ll_uuid } = req.params
    if (!ll_uuid) {
      return res.status(400).send({ error: 'missing ll_uuid' })
    }

    if (!validators.ll_uuid_validator(ll_uuid)) {
      return res.status(400).send({ error: 'invalid ll_uuid' })
    }

    const parcel = await get_parcel({ ll_uuid, detailed: true })

    res.status(200).send(parcel)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
