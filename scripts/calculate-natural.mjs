import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { postgres } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-natural')
debug.enable('calculate-natural,calculate-density')

const calculate_natural = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = postgres('planet_osm_polygon')
  query.select('leisure')
  query.select('boundary')
  query.select('landuse')
  query.select('natural')
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
    this.where('landuse', 'allotments')
    this.orWhere('landuse', 'flowerbed')
    this.orWhere('landuse', 'forest')
    this.orWhere('landuse', 'meadow')

    this.orWhere('leisure', 'park')
    this.orWhere('leisure', 'nature_reserve')
    this.orWhere('boundary', 'national_park')
    this.orWhere('boundary', 'protected_area')
    this.orWhere('landuse', 'recreation_ground')

    this.orWhere('natural', 'fell')
    this.orWhere('natural', 'grassland')
    this.orWhere('natural', 'health')
    this.orWhere('natural', 'scrub')
    this.orWhere('natural', 'shrubbery')
    this.orWhere('natural', 'tree')
    this.orWhere('natural', 'tree_row')
    this.orWhere('natural', 'tundra')
    this.orWhere('natural', 'wood')

    this.orWhere('natural', 'bay')
    this.orWhere('natural', 'beach')
    this.orWhere('natural', 'cape')
    this.orWhere('natural', 'coastline')
    this.orWhere('natural', 'crevasse')
    this.orWhere('natural', 'geyser')
    this.orWhere('natural', 'hot_spring')
    this.orWhere('natural', 'isthmus')
    this.orWhere('natural', 'peninsula')
    this.orWhere('natural', 'reef')
    this.orWhere('natural', 'shingle')
    this.orWhere('natural', 'shoal')
    this.orWhere('natural', 'spring')
    this.orWhere('natural', 'strait')
    this.orWhere('natural', 'water')
    this.orWhere('natural', 'wetland')

    this.orWhere('natural', 'bare_rock')
    this.orWhere('natural', 'dune')
    this.orWhere('natural', 'earth_bank')
    this.orWhere('natural', 'hill')
    this.orWhere('natural', 'rock')
    this.orWhere('natural', 'sand')
    this.orWhere('natural', 'scree')
    this.orWhere('natural', 'valley')
  })
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'natural',
    distance,
    latitude,
    longitude,
    is_point: false
  })
  // log(result)

  return result
}

const get_filtered_natural_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.natural_updated')

  parcels_query.limit(100)
  parcels_query.orderByRaw('RAND()')

  return parcels_query
}

const save_natural = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel natural density metrics`)
}

const calculate_natural_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing natural density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_natural({ longitude, latitude })

    inserts.push({
      ll_uuid,
      natural_updated: timestamp,
      ...data
    })

    if (inserts.length >= 10) {
      await save_natural(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_natural(inserts)
  }
}

const calculate_filtered_natural_parcels = async () => {
  const parcels = await get_filtered_natural_parcels()
  await calculate_natural_for_parcels(parcels)

  if (parcels.length === 100) {
    await calculate_filtered_natural_parcels()
  }
}

export default calculate_natural

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_natural_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_natural({ longitude, latitude })
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
