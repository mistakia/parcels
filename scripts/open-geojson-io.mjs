import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as turf from '@turf/turf'

import db from '#db'
// import config from '#config'
import { isMain, open_geojson_io } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('open-geojson-io')
debug.enable('open-geojson-io')

const open_parcel_on_geojson_io = async ({ path, ll_uuid }) => {
  if (!ll_uuid && path) {
    const parcels = await db('parcels').where({ path }).select(ll_uuid)
    if (parcels.length) {
      ll_uuid = parcels[0].ll_uuid
    }
  }

  if (!ll_uuid) {
    log(`could not locate ll_uuid for ${path}`)
    return
  }

  const parcel_query_results = await db('parcels_geometry').where({ ll_uuid })
  const parcel_geo = parcel_query_results[0]

  if (!parcel_geo) {
    log(`unable to find parcel for ${ll_uuid}`)
    const parcel_query_results = await db('parcels')
      .select('lon', 'lat')
      .where({ ll_uuid })
    const parcel = parcel_query_results[0]

    if (!parcel) {
      log(`unable to find parcel for ${ll_uuid}`)
      return
    }

    const parcel_feature = turf.feature({
      type: 'Point',
      coordinates: [Number(parcel.lon), Number(parcel.lat)]
    })
    open_geojson_io(parcel_feature)
  } else {
    const parcel_feature = turf.feature({
      type: 'Polygon',
      coordinates: [parcel_geo.coordinates]
    })
    open_geojson_io(parcel_feature)
  }
}

export default open_parcel_on_geojson_io

const main = async () => {
  let error
  try {
    await open_parcel_on_geojson_io({ path: argv.path, ll_uuid: argv.ll_uuid })
  } catch (err) {
    error = err
    console.log(error)
  }

  /* await db('jobs').insert({
   *   type: constants.jobs.EXAMPLE,
   *   succ: error ? 0 : 1,
   *   reason: error ? error.message : null,
   *   timestamp: Math.round(Date.now() / 1000)
   * })
   */
  process.exit()
}

if (isMain) {
  main()
}
