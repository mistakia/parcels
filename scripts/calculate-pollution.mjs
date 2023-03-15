import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { osm_db } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-pollution')
debug.enable('calculate-pollution,calculate-density')

const calculate_pollution = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = osm_db('planet_osm_polygon')
  query.select('leisure')
  query.select('boundary')
  query.select('landuse')
  query.select('military')
  query.select('name')
  query.select('power')
  query.select(
    osm_db.raw(
      `ST_Distance(${point_string},ST_Transform(way, 4326)::geography) as distance`
    )
  )
  query.select(
    osm_db.raw('ST_AsGeoJSON(ST_Transform(way, 4326)::geography) as geometry')
  )

  const distance = 25 * 1000 // in meters
  query.whereRaw(
    `ST_DWithin(${point_string},ST_Transform(way, 4326)::geography,${distance})`
  )
  query.where(function () {
    this.where(function () {
      this.whereNotNull('landuse')
      this.andWhereNot('landuse', 'education')
      this.andWhereNot('landuse', 'fairground')
      this.andWhereNot('landuse', 'residential')
      this.andWhereNot('landuse', 'allotments')
      this.andWhereNot('landuse', 'forest')
      this.andWhereNot('landuse', 'meadow')
      this.andWhereNot('landuse', 'cemetery')
      this.andWhereNot('landuse', 'grass')
    })
    this.orWhereNotNull('military')
    this.orWhere('power', 'plant')
  })
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'pollution',
    distance,
    latitude,
    longitude,
    is_point: false
  })
  // log(result)

  return result
}

const get_filtered_pollution_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.pollution_updated')

  parcels_query.limit(100)
  parcels_query.orderByRaw('RAND()')

  return parcels_query
}

const save_pollution = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel pollution density metrics`)
}

const calculate_pollution_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing pollution density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_pollution({ longitude, latitude })

    inserts.push({
      ll_uuid,
      pollution_updated: timestamp,
      ...data
    })

    if (inserts.length >= 10) {
      await save_pollution(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_pollution(inserts)
  }
}

const calculate_filtered_pollution_parcels = async () => {
  const parcels = await get_filtered_pollution_parcels()
  await calculate_pollution_for_parcels(parcels)

  if (parcels.length === 100) {
    await calculate_filtered_pollution_parcels()
  }
}

export default calculate_pollution

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_pollution_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_pollution({ longitude, latitude })
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
