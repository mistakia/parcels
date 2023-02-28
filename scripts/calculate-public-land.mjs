import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { postgres } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-public-land')
debug.enable('calculate-public-land,calculate-density')

const calculate_public_land = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = postgres('planet_osm_polygon')
  query.select('leisure')
  query.select('boundary')
  query.select('landuse')
  query.select('name')
  query.select(
    postgres.raw(
      `ST_Distance(${point_string},ST_Transform(way, 4326)::geography) as distance`
    )
  )
  query.select(
    postgres.raw('ST_AsGeoJSON(ST_Transform(way, 4326)::geography) as geometry')
  )

  const distance = 25 * 1000 // in meters
  query.whereRaw(
    `ST_DWithin(${point_string},ST_Transform(way, 4326)::geography,${distance})`
  )
  query.where(function () {
    this.where('leisure', 'park')
    this.orWhere('leisure', 'nature_reserve')
    this.orWhere('boundary', 'national_park')
    this.orWhere('boundary', 'protected_area')
    this.orWhere('landuse', 'recreation_ground')
  })
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'public_land',
    distance,
    latitude,
    longitude,
    is_point: false
  })
  // log(result)

  return result
}

const get_filtered_public_land_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.public_land_updated')

  parcels_query.limit(100)
  parcels_query.orderByRaw('RAND()')

  return parcels_query
}

const save_public_land = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel public_land density metrics`)
}

const calculate_public_land_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing public_land density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_public_land({ longitude, latitude })

    inserts.push({
      ll_uuid,
      public_land_updated: timestamp,
      ...data
    })

    if (inserts.length >= 10) {
      await save_public_land(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_public_land(inserts)
  }
}

const calculate_filtered_public_land_parcels = async () => {
  const parcels = await get_filtered_public_land_parcels()
  await calculate_public_land_for_parcels(parcels)

  if (parcels.length === 100) {
    await calculate_filtered_public_land_parcels()
  }
}

export default calculate_public_land

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_public_land_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_public_land({ longitude, latitude })
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
