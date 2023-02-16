import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { postgres } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-library')
debug.enable('calculate-library')

const calculate_library = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = postgres('planet_osm_point')
  query.select('amenity')
  query.select('name')
  query.select(
    postgres.raw(
      `ST_Distance(${point_string},ST_Transform(way, 4326)::geography) as distance`
    )
  )
  query.select(
    postgres.raw('ST_AsGeoJSON(ST_Transform(way, 4326)::geography) as geometry')
  )

  const distance = 50 * 1000 // in meters
  query.whereRaw(
    `ST_DWithin(${point_string},ST_Transform(way, 4326)::geography,${distance})`
  )
  query.where(function () {
    this.where('amenity', 'library')
    this.orWhere('amenity', 'public_bookcase')
  })
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'library',
    distance,
    latitude,
    longitude,
    is_point: true
  })
  // log(result)

  return result
}

const get_filtered_library_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.library_updated')

  return parcels_query
}

const save_library = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel library density metrics`)
}

const calculate_library_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing library density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_library({ longitude, latitude })

    inserts.push({
      ll_uuid,
      library_updated: timestamp,
      ...data
    })

    if (inserts.length >= 10) {
      await save_library(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_library(inserts)
  }
}

const calculate_filtered_library_parcels = async () => {
  const parcels = await get_filtered_library_parcels()
  await calculate_library_for_parcels(parcels)
}

export default calculate_library

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_library_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_library({ longitude, latitude })
    }
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
