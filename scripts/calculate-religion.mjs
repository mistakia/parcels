import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db, { osm_db } from '#db'
// import config from '#config'
import { isMain, calculate_density_for_query, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-religion')
debug.enable('calculate-religion,calculate-density')

const calculate_religion = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  const query = osm_db('planet_osm_polygon')
  query.select('landuse')
  query.select('denomination')
  query.select('religion')
  query.select('name')
  query.select(
    osm_db.raw(
      `ST_Distance(${point_string},ST_Transform(way, 4326)::geography) as distance`
    )
  )
  query.select(
    osm_db.raw('ST_AsGeoJSON(ST_Transform(way, 4326)::geography) as geometry')
  )

  const distance = 150 * 1000 // in meters
  query.whereRaw(
    `ST_DWithin(${point_string},ST_Transform(way, 4326)::geography,${distance})`
  )
  query.where('landuse', 'religious')
  query.orderBy('distance', 'asc')

  // log(query.toString())

  const result = await calculate_density_for_query({
    query,
    name: 'religion',
    distance,
    latitude,
    longitude,
    is_point: false
  })
  // log(result)

  return result
}

const get_filtered_religion_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.religion_updated')

  return parcels_query
}

const save_religion = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict('ll_uuid').merge()
  log(`inserted ${inserts.length} parcel religion density metrics`)
}

const calculate_religion_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing religion density: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_religion({ longitude, latitude })

    inserts.push({
      ll_uuid,
      religion_updated: timestamp,
      ...data
    })

    if (inserts.length >= 10) {
      await save_religion(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_religion(inserts)
  }
}

const calculate_filtered_religion_parcels = async () => {
  const parcels = await get_filtered_religion_parcels()
  await calculate_religion_for_parcels(parcels)
}

export default calculate_religion

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_religion_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242

      await calculate_religion({ longitude, latitude })
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
