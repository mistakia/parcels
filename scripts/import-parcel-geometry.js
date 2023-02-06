import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
import config from '#config'
import { isMain, request, USER_AGENT, get_parcels_query, wait } from '#common'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('import_parcel_geometry')
debug.enable('import_parcel_geometry')

const import_parcel_geometry = async ({ path }) => {
  const url = `${config.import_base_url}${path}.json`
  let res
  try {
    res = await request({
      url,
      headers: {
        'User-Agent': USER_AGENT,
        cookie: config.cookie
      }
    })
  } catch (err) {
    log(err)
    if (err.message.includes('Not Found')) {
      return true
    }
  }

  if (!res) {
    return false
  }

  if (!res.geometry) {
    return false
  }

  await db('parcels_geometry')
    .insert({
      path,
      coordinates: JSON.stringify(res.geometry.coordinates[0])
    })
    .onConflict()
    .merge()

  log(`imported geometry for ${path}`)
  return true
}

const get_importer_parcels_query = () => {
  const parcels_query = get_parcels_query()
  parcels_query.orderByRaw('RAND()')
  parcels_query.select('parcels.path')
  parcels_query
    .leftJoin('parcels_geometry', 'parcels_geometry.path', 'parcels.path')
    .whereNull('parcels_geometry.coordinates')

  parcels_query.limit(100000)

  return parcels_query
}

const importer = async (parcel) => {
  const parcels_query = get_importer_parcels_query()
  const parcels = await parcels_query
  log(`parcels missing geometry: ${parcels.length}`)
  for (const parcel of parcels) {
    const timer = wait(7000)
    const res = await import_parcel_geometry(parcel)
    await timer
    if (!res) {
      log('unable to retrieve parcel, exiting')
      break
    }
  }
}

export default importer

const main = async () => {
  let error
  try {
    await importer()
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
