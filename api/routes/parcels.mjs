import express from 'express'

const router = express.Router()

router.get('/?', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const parcels_query = db('parcels')

    parcels_query.limit(100)

    const parcels = await parcels_query

    res.status(200).send(parcels)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
