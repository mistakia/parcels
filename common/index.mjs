import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import path, { dirname } from 'path'
import { fetch, CookieJar } from 'node-fetch-cookies'
import regular_fetch from 'node-fetch'
import * as turf from '@turf/turf'

import db from '#db'

export { default as before_shutdown } from './before-shutdown.mjs'
export { default as open_geojson_io } from './open-geojson-io.mjs'
export { default as calculate_density_for_query } from './calculate-density-for-query.mjs'
export { default as within_distance } from './within-distance.mjs'
export { default as generate_raster_points_within_radius } from './generate-raster-points-within-radius.mjs'
export { default as get_file_paths } from './get-file-paths.mjs'
export { default as import_csv } from './import-csv.mjs'
export { default as chunk_inserts } from './chunk-inserts.mjs'
export { default as fetch_with_proxy } from './fetch-with-proxy.mjs'
export { default as get_proxy_urls } from './get-proxy-urls.mjs'
export { default as get_parcel } from './get-parcel.mjs'
export { default as get_importer_data } from './get-importer-data.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const data_path = path.resolve(__dirname, '../data')
export const lmdb_data_path = path.resolve(__dirname, '../lmdb-data')
const jarPath = path.resolve(__dirname, '../jar.json')
if (!fs.pathExistsSync(jarPath)) {
  fs.writeJsonSync(jarPath, [{}])
}
const cookieJar = new CookieJar(jarPath)

export const request = async ({ url, ...options }) => {
  await cookieJar.load()

  const response = await fetch(cookieJar, url, options)

  if (response.status >= 200 && response.status < 300) {
    await cookieJar.save()
    return response.json()
  } else {
    const res = await response.json()
    const error = new Error(res.error || response.statusText)
    error.response = response
    throw error
  }
}

export const isMain = (p) => process.argv[1] === fileURLToPath(p)
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const getParcelCount = async (path) => {
  const re = await db('parcels')
    .where('path', 'like', `${path}%`)
    .count('* as count')
  return re[0].count
}
export const getProperty = async (path) => {
  const re = await db('properties').where({ path })
  return re[0]
}

export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'

export const get_parcels_query = ({ min_acre = 5, max_acre = 400 } = {}) => {
  const parcels_query = db('parcels')

  parcels_query.leftJoin(
    'parcels_meta',
    'parcels_meta.ll_uuid',
    'parcels.ll_uuid'
  )
  parcels_query.where(function () {
    this.where('parcels_meta.public', false)
    this.orWhereNull('parcels_meta.public')
  })

  parcels_query.where(function () {
    this.where('parcels_meta.tribal', false)
    this.orWhereNull('parcels_meta.tribal')
  })

  parcels_query.where(function () {
    this.where('parcels.gisacre', '>=', min_acre)
    this.orWhere('parcels.ll_gisacre', '>=', min_acre)
  })

  parcels_query.where(function () {
    this.where('parcels.gisacre', '<=', max_acre)
    this.andWhere('parcels.ll_gisacre', '<=', max_acre)
  })

  parcels_query.whereRaw('lower(parcels.owner) not like "%city of%"')
  parcels_query.whereRaw('lower(parcels.owner) not like "state of%"')
  parcels_query.whereRaw('lower(parcels.owner) not like "% state of%"')
  parcels_query.whereRaw('lower(parcels.owner) not like "%federal%"')
  parcels_query.whereRaw('lower(parcels.owner) not like "%bureau of%"')

  const ownership_desc = [
    'No constraints — private ownership',
    'Public restrictions'
  ]
  parcels_query.where(function () {
    this.whereIn('parcels.lbcs_ownership_desc', ownership_desc)
    this.orWhereNull('parcels.lbcs_ownership_desc')
  })

  parcels_query.leftJoin(
    'parcels_road',
    'parcels_road.ll_uuid',
    'parcels.ll_uuid'
  )
  parcels_query.where(function () {
    this.where('parcels_road.highway_km', '>', 2.5)
    this.orWhereNull('parcels_road.highway_km')
  })

  return parcels_query
}

export const get_elevation = async (coordinates) => {
  // console.time('get_elevation')
  const url = 'http://192.168.1.100:3000'
  const res = await regular_fetch(url, {
    method: 'POST',
    body: JSON.stringify(coordinates),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // console.timeEnd('get_elevation')
  return res.json()
}

export const average = (array) => array.reduce((a, b) => a + b) / array.length

export const median = (array) => {
  array.sort((a, b) => a - b)
  const middle_index = Math.floor(array.length / 2)
  if (array.length % 2 === 0) {
    return (array[middle_index - 1] + array[middle_index]) / 2
  }
  return array[middle_index]
}

export const get_parcel_polygon = (parcel_coordinates, properties) => {
  if (Array.isArray(parcel_coordinates[0][0])) {
    return turf.multiPolygon([parcel_coordinates], properties)
  } else {
    return turf.polygon([parcel_coordinates], properties)
  }
}

/* const closest_distance_from_point_to_polygon = (point, polygon) => {
 *   let closestDistance = Infinity
 *   for (let i = 0; i < polygon.geometry.coordinates[0].length - 1; i++) {
 *     const line = turf.lineString([
 *       polygon.geometry.coordinates[0][i],
 *       polygon.geometry.coordinates[0][i + 1]
 *     ])
 *     const distance = turf.pointToLineDistance(point, line)
 *     closestDistance = Math.min(closestDistance, distance)
 *   }
 *   return closestDistance
 * }
 *  */

/* eslint-disable no-extra-semi */
export const group_by = (xs, key) => {
  return xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
/* eslint-enable no-extra-semi */
