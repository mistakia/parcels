import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as turf from '@turf/turf'

import db from '#db'
import config from '#config'
import { isMain, open_geojson_io } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('open-geojson-io')
debug.enable('open-geojson-io')

const open_parcel_on_geojson_io = async (path) => {
  const parcel_query_results = await db('parcels_geometry').where({ path })
  const parcel = parcel_query_results[0]

  if (parcel) {
    const parcel_feature = turf.feature({
      type: 'Polygon',
      coordinates: [parcel.coordinates]
    })
    open_geojson_io(parcel_feature)
  }
}

export default open_parcel_on_geojson_io

const main = async () => {
  let error
  try {
    await open_parcel_on_geojson_io(argv.path)
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
