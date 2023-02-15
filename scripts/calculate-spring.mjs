import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { postgres } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-spring')
debug.enable('calculate-spring,calculate-density')

const calculate_spring = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = postgres('planet_osm_point')
  query.select('natural')
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

  const distance = 100 * 1000 // in meters
  query.whereRaw(
    `ST_DWithin(${point_string},ST_Transform(way, 4326)::geography,${distance})`
  )
  query.where(function () {
    this.where('natural', 'hot_spring')
    this.orWhere('natural', 'spring')
  })
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'spring',
    distance,
    latitude,
    longitude,
    is_point: true
  })
  // log(result)

  return result
}

const get_filtered_spring_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.spring_updated')

  return parcels_query
}

const save_spring = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel spring density metrics`)
}

const calculate_spring_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing spring density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_spring({ longitude, latitude })

    inserts.push({
      ll_uuid,
      spring_updated: timestamp,
      ...data
    })

    if (inserts.length >= 100) {
      await save_spring(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_spring(inserts)
  }
}

const calculate_filtered_spring_parcels = async () => {
  const parcels = await get_filtered_spring_parcels()
  await calculate_spring_for_parcels(parcels)
}

export default calculate_spring

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_spring_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_spring({ longitude, latitude })
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
