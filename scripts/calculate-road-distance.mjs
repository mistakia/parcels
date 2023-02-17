import debug from 'debug'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import GeojsonFlatbush from 'geojson-flatbush'

import db from '#db'
// import config from '#config'
import { isMain, get_parcels_query } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-road-distance')
debug.enable('calculate-road-distance')

const get_all_road_parcels = async () => {
  const parcels_query = db('parcels')
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .whereNull('parcels_road.road_km')

  return parcels_query
}

const get_filtered_road_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')

  parcels_query
    .whereNull('parcels_road.road_km')

  return parcels_query
}

const save_distances = async (inserts) => {
  await db('parcels_road').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel road distances`)
}

const calculate_road_distances_for_parcels = async (parcels) => {
  const road_types = [
    'Freeway',
    'Primary',
    'Secondary',
    'Paved',
    'Unpaved',
    'Tollway'
  ]
  const roads = await db('roads').whereIn('type', road_types)
  log(`loaded ${roads.length} roads from db`)

  const all_road_features = roads.map((item) => {
    const { lineString, ...rest } = item
    return turf.lineString(lineString, rest)
  })

  const all_roads_index = new GeojsonFlatbush(all_road_features.length)
  const all_roads_collection = turf.featureCollection(all_road_features)
  all_roads_index.load(all_roads_collection)
  all_roads_index.finish()
  log('all roads index built')

  const paved_road_features = all_road_features.filter(
    (f) => f.properties.type !== 'Unpaved'
  )
  const paved_roads_index = new GeojsonFlatbush(paved_road_features.length)
  const paved_roads_collection = turf.featureCollection(paved_road_features)
  paved_roads_index.load(paved_roads_collection)
  paved_roads_index.finish()
  log('paved roads index built')

  const high_traffic_exclude_types = ['Unpaved', 'Paved']
  const high_traffic_features = all_road_features.filter(
    (f) => !high_traffic_exclude_types.includes(f.properties.type)
  )
  const high_traffic_index = new GeojsonFlatbush(high_traffic_features.length)
  const high_traffic_collection = turf.featureCollection(high_traffic_features)
  high_traffic_index.load(high_traffic_collection)
  high_traffic_index.finish()
  log('high traffic roads index built')

  const highway_types = ['Tollway', 'Freeway']
  const highway_features = all_road_features.filter((f) =>
    highway_types.includes(f.properties.type)
  )
  const highway_index = new GeojsonFlatbush(highway_features.length)
  const highway_collection = turf.featureCollection(highway_features)
  highway_index.load(highway_collection)
  highway_index.finish()
  log('highway roads index built')

  let inserts = []
  log(`parcels missing road distances: ${parcels.length}`)
  for (const parcel of parcels) {
    const closest_road = {
      road_km: Infinity,
      paved_km: Infinity,
      high_traffic_km: Infinity,
      highway_km: Infinity
    }

    const parcel_point = turf.point([parcel.lon, parcel.lat])
    const radius = 100
    const parcel_circle = turf.circle(turf.getCoord(parcel_point), radius)

    const all_roads_result = all_roads_index.search(
      parcel_circle,
      all_roads_collection
    )
    for (const road_feature of all_roads_result.features) {
      const distance = turf.pointToLineDistance(parcel_point, road_feature)
      if (distance < closest_road.road_km) {
        closest_road.road_km = distance
      }
    }

    const paved_roads_result = paved_roads_index.search(
      parcel_circle,
      paved_roads_collection
    )
    for (const road_feature of paved_roads_result.features) {
      const distance = turf.pointToLineDistance(parcel_point, road_feature)
      if (distance < closest_road.paved_km) {
        closest_road.paved_km = distance
      }
    }

    const high_traffic_result = high_traffic_index.search(
      parcel_circle,
      high_traffic_collection
    )
    for (const road_feature of high_traffic_result.features) {
      const distance = turf.pointToLineDistance(parcel_point, road_feature)
      if (distance < closest_road.high_traffic_km) {
        closest_road.high_traffic_km = distance
      }
    }

    const highway_radius = 300
    const highway_parcel_circle = turf.circle(
      turf.getCoord(parcel_point),
      highway_radius
    )
    const highway_result = highway_index.search(
      highway_parcel_circle,
      highway_collection
    )
    for (const road_feature of highway_result.features) {
      const distance = turf.pointToLineDistance(parcel_point, road_feature)
      if (distance < closest_road.highway_km) {
        closest_road.highway_km = distance
      }
    }

    const insert = {
      ll_uuid: parcel.ll_uuid,
      ...closest_road
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
