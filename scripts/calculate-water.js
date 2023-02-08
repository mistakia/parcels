import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { postgres } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-public-land')
debug.enable('calculate-public-land,calculate-density')

const calculate_water = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = postgres('planet_osm_polygon')
  query.select('name')
  query.select('natural')
  query.select(
    postgres.raw(
      `ST_Distance(${point_string},ST_Transform(way, 4326)::geography) as distance`
    )
  )
  query.select(
    postgres.raw('ST_AsGeoJSON(ST_Transform(way, 4326)::geography) as geometry')
  )
  // query.select(postgres.raw('ST_Y(ST_Transform(way, 4326)) as latitude'))
  // query.select(postgres.raw('ST_X(ST_Transform(way, 4326)) as longitude'))

  const distance = 50 * 1000 // in meters
  query.whereRaw(
    `ST_DWithin(${point_string},ST_Transform(way, 4326)::geography,${distance})`
  )
  query.where(function () {
    this.where('natural', 'bay')
    // this.orWhere('natural', 'beach')
    // this.orWhere('natural', 'blowhole')
    // this.orWhere('natural', 'cape')
    this.orWhere('natural', 'coastline')
    // this.orWhere('natural', 'crevasse')
    // this.orWhere('natural', 'geyser')
    // this.orWhere('natural', 'glacier')
    this.orWhere('natural', 'hot_spring')
    // this.orWhere('natural', 'isthmus')
    // this.orWhere('natural', 'mud')
    this.orWhere('natural', 'shoal')
    this.orWhere('natural', 'spring')
    this.orWhere('natural', 'water')
    this.orWhere('natural', 'wetland')
  })
  // query.groupBy('name', 'way')
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'water',
    latitude,
    longitude,
    distance,
    is_point: false
  })
  // log(result)

  return result
}

const get_filtered_water_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.path', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.path', 'parcels.path')
    .whereNull('parcels_density.water_updated')

  return parcels_query
}

const save_water = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel water density metrics`)
}

const calculate_water_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing water density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { path } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_water({ longitude, latitude })

    inserts.push({
      path,
      water_updated: timestamp,
      ...data
    })

    if (inserts.length >= 1000) {
      await save_water(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_water(inserts)
  }
}

const calculate_filtered_water_parcels = async () => {
  const parcels = await get_filtered_water_parcels()
  await calculate_water_for_parcels(parcels)
}

export default calculate_water

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_water_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_water({ longitude, latitude })
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
