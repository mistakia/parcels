import debug from 'debug'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-airport-distance')
debug.enable('calculate-airport-distance')

const get_all_airport_parcels = async () => {
  const parcels_query = db('parcels')
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_airport', 'parcels_airport.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_airport.distance_km')

  return parcels_query
}

const get_filtered_airport_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_airport', 'parcels_airport.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_airport.distance_km')

  return parcels_query
}

const save_distances = async (inserts) => {
  await db('parcels_airport').insert(inserts).onConflict('ll_uuid').merge()
  log(`inserted ${inserts.length} parcel airport distances`)
}

const calculate_airport_distances_for_parcels = async (parcels) => {
  const airports = await db('airports')

  const airport_features = []
  for (const airport of airports) {
    const geometry = {
      type: 'Point',
      coordinates: [airport.longitude, airport.latitude]
    }
    const airport_feature = turf.feature(geometry, airport)
    airport_features.push(airport_feature)
  }

  let inserts = []
  log(`parcels missing airport distances: ${parcels.length}`)
  for (const parcel of parcels) {
    const closest_airport = {
      distance: Infinity,
      airport: null
    }

    const parcel_point = turf.point([parcel.lon, parcel.lat])
    for (const airport_feature of airport_features) {
      const distance = turf.distance(parcel_point, airport_feature)
      if (distance < closest_airport.distance) {
        closest_airport.distance = distance
        closest_airport.airport = airport_feature.properties
      }
    }

    inserts.push({
      ll_uuid: parcel.ll_uuid,
      distance_km: Math.round(closest_airport.distance),
      abbrev: closest_airport.airport.abbrev
    })

    if (inserts.length >= 1000) {
      await save_distances(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_distances(inserts)
  }
}

const calculate_all_airport_distances = async () => {
  const parcels = await get_all_airport_parcels()
  await calculate_airport_distances_for_parcels(parcels)
}

const calculate_filtered_airport_distance = async () => {
  const parcels = await get_filtered_airport_parcels()
  await calculate_airport_distances_for_parcels(parcels)
}

export default calculate_filtered_airport_distance

const main = async () => {
  let error
  try {
    if (argv.all) {
      await calculate_all_airport_distances()
    } else {
      await calculate_filtered_airport_distance()
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
