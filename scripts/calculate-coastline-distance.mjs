import debug from 'debug'
import fs from 'fs-extra'
import path from 'path'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, data_path, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-coastline-distance')
debug.enable('calculate-coastline-distance')

const get_all_coastline_parcels = async () => {
  const parcels_query = db('parcels')
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin(
      'parcels_coastline',
      'parcels_coastline.ll_uuid',
      'parcels.ll_uuid'
    )
    .whereNull('parcels_coastline.distance_km')

  return parcels_query
}

const get_filtered_coastline_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin(
      'parcels_coastline',
      'parcels_coastline.ll_uuid',
      'parcels.ll_uuid'
    )
    .whereNull('parcels_coastline.distance_km')

  return parcels_query
}

const save_distances = async (inserts) => {
  await db('parcels_coastline').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel coastline distances`)
}

const calculate_coastline_distances_for_parcels = async (parcels) => {
  const coastline_geojson = fs.readJsonSync(
    path.resolve(data_path, './coastline_110m.geo.json')
  )

  let inserts = []
  log(`parcels missing coastline distances: ${parcels.length}`)
  for (const parcel of parcels) {
    let closest_coastline = Infinity
    const parcel_point = turf.point([parcel.lon, parcel.lat])
    turf.featureEach(coastline_geojson, (coastline) => {
      const distance = turf.pointToLineDistance(parcel_point, coastline)
      if (distance < closest_coastline) {
        closest_coastline = distance
      }
    })

    inserts.push({
      ll_uuid: parcel.ll_uuid,
      distance_km: closest_coastline
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

const calculate_all_coastline_distances = async () => {
  const parcels = await get_all_coastline_parcels()
  await calculate_coastline_distances_for_parcels(parcels)
}

const calculate_filtered_coastline_distance = async () => {
  const parcels = await get_filtered_coastline_parcels()
  await calculate_coastline_distances_for_parcels(parcels)
}

export default calculate_filtered_coastline_distance

const main = async () => {
  let error
  try {
    if (argv.all) {
      await calculate_all_coastline_distances()
    } else {
      await calculate_filtered_coastline_distance()
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
