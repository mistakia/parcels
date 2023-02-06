import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain } from '#common'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('cleanup_parcel_geometry')
debug.enable('cleanup_parcel_geometry')

const cleanup_parcel_geometry = async () => {
  const parcels = await db('parcels_geometry')
  const inserts = []
  for (const parcel of parcels) {
    if (parcel.coordinates.length === 1) {
      inserts.push({
        ...parcel,
        coordinates: JSON.stringify(parcel.coordinates[0])
      })
    }
  }

  await db('parcels_geometry').insert(inserts).onConflict().merge()
  log(`cleaned ${inserts.length} parcel geometries`)
}

export default cleanup_parcel_geometry

const main = async () => {
  let error
  try {
    await cleanup_parcel_geometry()
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
