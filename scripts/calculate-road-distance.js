import debug from 'debug'
import path from 'path'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'fs-extra'
import GeojsonFlatbush from 'geojson-flatbush'

import db from '#db'
// import config from '#config'
import { isMain, get_parcels_query, data_path } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-road-distance')
debug.enable('calculate-road-distance')

const get_all_road_parcels = async () => {
  const parcels_query = db('parcels')
  parcels_query.select('parcels.path', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_road', 'parcels_road.path', 'parcels.path')
    .whereNull('parcels_road.distance_km')

  return parcels_query
}

const get_filtered_road_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.path', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_road', 'parcels_road.path', 'parcels.path')
    .whereNull('parcels_road.distance_km')

  return parcels_query
}

const save_distances = async (inserts) => {
  await db('parcels_road').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel road distances`)
}

const calculate_road_distances_for_parcels = async (parcels) => {
  const roads_geojson = fs.readJsonSync(
    path.resolve(data_path, './north_american_roads.geo.json')
  )

  const index = new GeojsonFlatbush(roads_geojson.features.length)
  index.load(roads_geojson)
  index.finish()

  let inserts = []
  log(`parcels missing road distances: ${parcels.length}`)
  for (const parcel of parcels) {
    const closest_road = {
      distance: Infinity,
      road: null
    }

    const parcel_point = turf.point([parcel.lon, parcel.lat])
    const radius = 100
    const parcel_circle = turf.circle(turf.getCoord(parcel_point), radius)
    // const parcel_bbox = turf.bbox(parcel_circle)
    const search_collection = index.search(parcel_circle, roads_geojson)
    for (const road_feature of search_collection.features) {
      const distance = turf.pointToLineDistance(parcel_point, road_feature)
      if (distance < closest_road.distance) {
        closest_road.distance = distance
        closest_road.road = road_feature.properties
      }
    }

    const insert = {
      path: parcel.path,
      distance_km: closest_road.distance
    }
    inserts.push(insert)

    if (inserts.length >= 1000) {
      await save_distances(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_distances(inserts)
  }
}

const calculate_all_road_distances = async () => {
  const parcels = await get_all_road_parcels()
  await calculate_road_distances_for_parcels(parcels)
}

const calculate_filtered_road_distance = async () => {
  const parcels = await get_filtered_road_parcels()
  await calculate_road_distances_for_parcels(parcels)
}

export default calculate_filtered_road_distance

const main = async () => {
  let error
  try {
    if (argv.all) {
      await calculate_all_road_distances()
    } else {
      await calculate_filtered_road_distance()
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
