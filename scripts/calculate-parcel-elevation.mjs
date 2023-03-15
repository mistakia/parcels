import debug from 'debug'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import percentile from 'percentile'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, get_parcels_query, get_elevation, median } from '#utils'
import { get_parcel_polygon } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-parcel-elevation')
debug.enable('calculate-parcel-elevation')

const default_percentiles = [0, 10, 25, 50, 75, 90, 100]

const get_all_elevation_parcels = async () => {
  const parcels_query = db('parcels')
  parcels_query.select(
    'parcels.ll_uuid',
    'parcels.lat',
    'parcels.lon',
    'parcels_geometry.coordinates'
  )
  parcels_query.join(
    'parcels_geometry',
    'parcels_geometry.ll_uuid',
    'parcels.ll_uuid'
  )

  parcels_query
    .leftJoin(
      'parcels_elevation',
      'parcels_elevation.ll_uuid',
      'parcels.ll_uuid'
    )
    .whereNull('parcels_elevation.p50')

  return parcels_query
}

const get_filtered_elevation_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select(
    'parcels.ll_uuid',
    'parcels.lat',
    'parcels.lon',
    'parcels_geometry.coordinates'
  )
  parcels_query.join(
    'parcels_geometry',
    'parcels_geometry.ll_uuid',
    'parcels.ll_uuid'
  )

  parcels_query
    .leftJoin(
      'parcels_elevation',
      'parcels_elevation.ll_uuid',
      'parcels.ll_uuid'
    )
    .whereNull('parcels_elevation.p50')

  return parcels_query
}

const save_inserts = async (inserts) => {
  await db('parcels_elevation').insert(inserts).onConflict('ll_uuid').merge()
  log(`inserted ${inserts.length} parcel elevation info`)
}

const calculate_elevation_distances_for_parcels = async (parcels) => {
  log(`parcels missing elevation: ${parcels.length}`)
  let inserts = []

  for (const parcel of parcels) {
    let parcel_polygon
    try {
      parcel_polygon = get_parcel_polygon(parcel.coordinates)
    } catch (err) {
      log(parcel)
      log(err)
    }

    if (!parcel_polygon) {
      continue
    }
    const parcel_bbox = turf.bbox(parcel_polygon)
    const cell_side = 0.1 // 20 meters
    const point_grid = turf.pointGrid(parcel_bbox, cell_side)

    const coordinates = []

    coordinates.push([Number(parcel.lat), Number(parcel.lon)])

    for (const point of point_grid.features) {
      if (!turf.booleanPointInPolygon(point, parcel_polygon)) {
        continue
      }

      coordinates.push([
        point.geometry.coordinates[1],
        point.geometry.coordinates[0]
      ])
    }

    const elevations = await get_elevation(coordinates)
    const p_results = percentile(default_percentiles, elevations)

    inserts.push({
      ll_uuid: parcel.ll_uuid,
      min: p_results[0],
      p10: p_results[1],
      p25: p_results[2],
      p50: p_results[3],
      p75: p_results[4],
      p90: p_results[5],
      max: p_results[6],
      median: median(elevations)
    })

    if (inserts.length >= 1000) {
      await save_inserts(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_inserts(inserts)
  }
}

const calculate_all_elevation_distances = async () => {
  const parcels = await get_all_elevation_parcels()
  await calculate_elevation_distances_for_parcels(parcels)
}

const calculate_filtered_elevation_distance = async () => {
  const parcels = await get_filtered_elevation_parcels()
  await calculate_elevation_distances_for_parcels(parcels)
}

export default calculate_elevation_distances_for_parcels

const main = async () => {
  let error
  try {
    if (argv.all) {
      await calculate_all_elevation_distances()
    } else {
      await calculate_filtered_elevation_distance()
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
