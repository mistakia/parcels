import express from 'express'
import h3 from 'h3-js'

const router = express.Router()

router.get('/?', async (req, res) => {
  const { log, db } = req.app.locals
  try {
    const { ne_lat, ne_lon, sw_lat, sw_lon } = req.query

    if (!ne_lat || !ne_lon || !sw_lat || !sw_lon) {
      return res.status(400).send({
        error: 'ne_lat, ne_lon, sw_lat, and sw_lon are required'
      })
    }

    // Create a polygon from the bounding box coordinates
    const polygon = [
      [Number(ne_lat), Number(ne_lon)],
      [Number(ne_lat), Number(sw_lon)],
      [Number(sw_lat), Number(sw_lon)],
      [Number(sw_lat), Number(ne_lon)],
      [Number(ne_lat), Number(ne_lon)]
    ]

    // Convert the polygon to H3 res4 ids
    const h3_res4_ids = h3.polygonToCells(polygon, 4)

    log(`h3_res4_ids: ${h3_res4_ids}`)

    // Query the heatmaps table for all rows with an h3_res4_id that matches any of the ids in h3_res4_ids
    const rows = await db('heatmaps').whereIn('h3_res4_id', h3_res4_ids)

    res.send(rows)
  } catch (err) {
    log(err)
    res.status(500).send({ error: err.toString() })
  }
})

export default router
