import debug from 'debug'
import yargs from 'yargs'
// import fs from 'fs-extra'
// import * as turf from '@turf/turf'
import { hideBin } from 'yargs/helpers'
import h3 from 'h3-js'

import db from '#db'
// import config from '#config'
import { isMain, get_parcels_query } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-broadband')
debug.enable('calculate-broadband')

const calculate_broadband = async ({ longitude, latitude }) => {
  console.time('calculate-broadband')
  const h3_res8_id = h3.latLngToCell(latitude, longitude, 8)
  const results = await db('broadband_availability').where({ h3_res8_id })

  const neighbors = h3.gridDisk(h3_res8_id, 15)
  const neighbor_results = await db('broadband_availability').whereIn(
    'h3_res8_id',
    neighbors
  )
  const neighbors_sorted = neighbor_results
    .map((p) => {
      return {
        distance: h3.gridDistance(h3_res8_id, p.h3_res8_id),
        ...p
      }
    })
    .sort((a, b) => a.distance - b.distance)

  const result = {
    max_download_speed: results.length
      ? Math.max(...results.map((p) => p.max_advertised_download_speed))
      : null,
    max_upload_speed: results.length
      ? Math.max(...results.map((p) => p.max_advertised_upload_speed))
      : null,
    low_latency: results.length
      ? Boolean(results.find((r) => r.low_latency))
      : null,
    closest_provider_h3_res8_id: neighbors_sorted.length
      ? neighbors_sorted[0].h3_res8_id
      : null,
    closest_provider_distance: neighbors_sorted.length
      ? neighbors_sorted[0].distance
      : null,
    nearby_max_download_speed: neighbor_results.length
      ? Math.max(
          ...neighbor_results.map((p) => p.max_advertised_download_speed)
        )
      : null,
    nearby_max_upload_speed: neighbor_results.length
      ? Math.max(...neighbor_results.map((p) => p.max_advertised_upload_speed))
      : null,
    surrounding_providers: [
      ...new Set(neighbor_results.map((p) => p.brand_name))
    ],
    surrounding_coverage_density:
      [...new Set(neighbor_results.map((p) => p.h3_res8_id))].length /
      neighbors.length
  }

  /* const geojson_features = neighbors.map(h3_res8_id => {
   *   const coordinates = h3.cellToBoundary(h3_res8_id, true)
   *   const geometry = {
   *     type: 'Polygon',
   *     coordinates: [coordinates]
   *   }
   *   return turf.feature(geometry)
   * })
   * fs.writeJsonSync('./test.geo.json', turf.featureCollection(geojson_features))
   */
  /* const state_results = await db('broadband_availability').where('state_usps', 'MI')
   * const geojson_features = state_results.map(p => {
   *   const coordinates = h3.cellToBoundary(p.h3_res8_id, true)
   *   const geometry = {
   *     type: 'Polygon',
   *     coordinates: [coordinates]
   *   }
   *   return turf.feature(geometry)
   * })
   * fs.writeJsonSync('./test.geo.json', turf.featureCollection(geojson_features)) */

  console.timeEnd('calculate-broadband')
  return result
}

const get_filtered_broadband_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.path', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_internet', 'parcels_internet.path', 'parcels.path')
    .whereNull('parcels_internet.broadband_updated')

  parcels_query.limit(1000)

  return parcels_query
}

const save_broadband = async (inserts) => {
  await db('parcels_internet').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel broadband metrics`)
}

const calculate_broadband_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing broadband: ${parcels.length}`)
  for (const parcel of parcels) {
    const { path } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const { surrounding_providers, ...data } = await calculate_broadband({
      longitude,
      latitude
    })

    inserts.push({
      path,
      broadband_updated: timestamp,
      surrounding_providers: surrounding_providers.length
        ? JSON.stringify(surrounding_providers)
        : null,
      ...data
    })

    if (inserts.length >= 100) {
      await save_broadband(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_broadband(inserts)
  }
}

const calculate_filtered_broadband_parcels = async () => {
  const parcels = await get_filtered_broadband_parcels()
  await calculate_broadband_for_parcels(parcels)
}

export default calculate_broadband

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_broadband_parcels()
    } else {
      const longitude = argv.lon || -79.760661
      const latitude = argv.lat || 38.755842

      const result = await calculate_broadband({ longitude, latitude })
      log({
        latitude,
        longitude,
        ...result
      })
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
