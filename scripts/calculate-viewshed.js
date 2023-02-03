import debug from 'debug'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs-extra'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
// import asciichart from 'asciichart'

import db from '#db'
// import config from '#config'
import { isMain, data_path, get_parcels_query } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-view')
debug.enable('calculate-view')

/* eslint-disable no-extra-semi */
const group_by = (xs, key) =>
  xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
/* eslint-enable no-extra-semi */

function to_radians(degree) {
  return (degree * Math.PI) / 180
}

// returns a coordinate given a starting coordinate, degree direction and distance
function get_coordinate(start, degree, distance) {
  // console.time('get_coordinates')
  const earth_radius = 6371 // Earth's mean radius in kilometers

  const lat1 = to_radians(start.latitude)
  const lon1 = to_radians(start.longitude)
  const brng = to_radians(degree)

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / earth_radius) +
      Math.cos(lat1) * Math.sin(distance / earth_radius) * Math.cos(brng)
  )

  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(distance / earth_radius) * Math.cos(lat1),
      Math.cos(distance / earth_radius) - Math.sin(lat1) * Math.sin(lat2)
    )

  // console.timeEnd('get_coordinates')
  return {
    latitude: (lat2 * 180) / Math.PI,
    longitude: (lon2 * 180) / Math.PI,
    distance
  }
}

function generate_intermediate_points(start_point, end_point, steps) {
  // console.time('generate_intermediate_points')
  const coordinates = []
  const startLat = to_radians(start_point.latitude)
  const startLng = to_radians(start_point.longitude)
  const endLat = to_radians(end_point.latitude)
  const endLng = to_radians(end_point.longitude)
  const delta = (endLat - startLat) / steps

  coordinates.push({
    ...start_point,
    distance: 0
  })

  for (let i = 1; i <= steps; i++) {
    const a = startLat + delta * i
    const b = startLng + ((endLng - startLng) * i) / steps
    const latitude = (a * 180) / Math.PI
    const longitude = (b * 180) / Math.PI
    const distance = turf.distance(
      [start_point.longitude, start_point.latitude],
      [longitude, latitude]
    )
    coordinates.push({ latitude, longitude, distance })
  }

  // console.timeEnd('generate_intermediate_points')
  return coordinates
}

function has_line_of_sight(start_point, target_point, intermediate_points) {
  const slope =
    (target_point.elevation - start_point.elevation) / target_point.distance

  let visible = true
  for (const intermediate_point of intermediate_points) {
    const elevation =
      start_point.elevation + slope * intermediate_point.distance
    if (intermediate_point.elevation > elevation) {
      visible = false
      break
    }
  }

  return visible
}

const is_point_in_continential_united_states = ({ point, nation_geojson }) => {
  for (const feature_state of nation_geojson.features) {
    if (turf.booleanPointInPolygon(point, feature_state)) {
      return true
    }
  }

  return false
}

const get_elevation = async (coordinates) => {
  // log(`getting elevation data for ${coordinates.length} coorindates`)
  // console.time('get_elevation')
  const url = 'http://192.168.1.100:3000'
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(coordinates),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // console.timeEnd('get_elevation')
  return res.json()
}

const calculate_viewshed_index = async (start_point) => {
  console.time('calculate-viewshed-index')
  let viewshed_index = 0
  let viewshed_index_under_2km = 0
  let viewshed_index_2km = 0
  let viewshed_index_5km = 0
  let viewshed_index_10km = 0
  let viewshed_index_20km = 0
  let viewshed_index_50km = 0
  let viewshed_index_75km = 0

  let viewshed_nw = 0
  let viewshed_sw = 0
  let viewshed_se = 0
  let viewshed_ne = 0

  const viewshed_distance = 100 // kilometers
  const number_of_intermediate_points = (viewshed_distance * 1000) / 50
  const max_points = number_of_intermediate_points * 360

  for (let degree = 0; degree < 360; degree = degree + 10) {
    const end_point = get_coordinate(start_point, degree, viewshed_distance)

    const view_line_intermediate_points = generate_intermediate_points(
      start_point,
      end_point,
      number_of_intermediate_points
    )

    const view_line_coordinates = view_line_intermediate_points.map((p) => [
      p.latitude,
      p.longitude
    ])
    const view_line_intermediate_elevations = await get_elevation(
      view_line_coordinates
    )
    view_line_intermediate_elevations.forEach((elevation, index) => {
      if (index === 0) {
        start_point.elevation = elevation
      }
      view_line_intermediate_points[index].elevation = elevation
    })

    view_line_intermediate_points.forEach((target_point, index) => {
      const intermediate_points = view_line_intermediate_points.slice(0, index)
      const is_visible = has_line_of_sight(
        start_point,
        target_point,
        intermediate_points
      )

      target_point.is_visible = is_visible

      if (is_visible) {
        viewshed_index += 1

        if (degree < 90) {
          viewshed_nw += 1
        } else if (degree < 180) {
          viewshed_sw += 1
        } else if (degree < 270) {
          viewshed_se += 1
        } else {
          viewshed_ne += 1
        }

        if (target_point.distance < 2) {
          viewshed_index_under_2km += 1
        } else if (target_point.distance < 5) {
          viewshed_index_2km += 1
        } else if (target_point.distance < 10) {
          viewshed_index_5km += 1
        } else if (target_point.distance < 20) {
          viewshed_index_10km += 1
        } else if (target_point.distance < 50) {
          viewshed_index_20km += 1
        } else if (target_point.distance < 75) {
          viewshed_index_50km += 1
        } else {
          viewshed_index_75km += 1
        }
      }
    })

    /* if (degree === 90) {
     *   console.log(end_point)
     *   function every_n_items(array, n) {
     *     return array.filter((element, index) => index % n === n - 1)
     *   }
     *   console.log(
     *     asciichart.plot(every_n_items(view_line_intermediate_elevations, 15), {
     *       height: 10
     *     })
     *   )
     * } */
  }

  console.timeEnd('calculate-viewshed-index')
  return {
    viewshed_percentage: Number(
      ((viewshed_index / max_points) * 100).toFixed(2)
    ),
    viewshed_index,

    viewshed_index_under_2km,
    viewshed_index_2km,
    viewshed_index_5km,
    viewshed_index_10km,
    viewshed_index_20km,
    viewshed_index_50km,
    viewshed_index_75km,

    viewshed_nw,
    viewshed_sw,
    viewshed_se,
    viewshed_ne
  }
}

const calculate_viewshed_index_for_united_states = async () => {
  const nation_geojson = fs.readJsonSync(
    path.resolve(data_path, './us_continental_counties_500k.geo.json')
  )
  const nation_bbox = turf.bbox(nation_geojson)
  const point_grid = turf.pointGrid(nation_bbox, 1000)
  for (const point of point_grid.features) {
    const is_in_united_states = is_point_in_continential_united_states({
      point,
      nation_geojson
    })
    if (!is_in_united_states) {
      continue
    }

    const start_point = {
      latitude: point.geometry.coordinates[1],
      longitude: point.geometry.coordinates[0]
    }

    const visibility_indexes = await calculate_viewshed_index(start_point)

    log({
      start_point,
      visibility_indexes
    })
  }
}

const find_item_with_highest_value = (array, prop) => {
  let maxItem = array[0]
  for (let i = 1; i < array.length; i++) {
    if (array[i][prop] > maxItem[prop]) {
      maxItem = array[i]
    }
  }
  return maxItem
}

const find_highest_elevation_within_polygon = async (feature_polygon) => {
  const bbox = turf.bbox(feature_polygon)
  const points = []
  const point_grid = turf.pointGrid(bbox, 0.03)
  turf.featureEach(point_grid, (point, point_index) => {
    if (turf.booleanPointInPolygon(point, feature_polygon)) {
      const coordinates = turf.getCoord(point)
      points.push({
        lon_lat_coordinates: coordinates,
        lat_lon_coordinates: [coordinates[1], coordinates[0]]
      })
    }
  })

  const point_coordinates = points.map((p) => p.lat_lon_coordinates)
  const elevations = await get_elevation(point_coordinates)
  elevations.forEach((elevation, index) => {
    points[index].elevation = elevation
  })
  const highest_point = find_item_with_highest_value(points, 'elevation')

  return highest_point
}

const find_high_elevation_points_within_polygon = async (
  feature_polygon,
  cell_size = 0.1
) => {
  const parcel_bbox = turf.bbox(feature_polygon)
  const parcel_square_grid = turf.squareGrid(parcel_bbox, cell_size)
  const points = []

  turf.featureEach(parcel_square_grid, (square_polygon, grid_index) => {
    const square_bbox = turf.bbox(square_polygon)
    const point_grid = turf.pointGrid(square_bbox, 0.03)
    turf.featureEach(point_grid, (point, point_index) => {
      if (turf.booleanPointInPolygon(point, feature_polygon)) {
        const coordinates = turf.getCoord(point)
        points.push({
          grid_index,
          lon_lat_coordinates: coordinates,
          lat_lon_coordinates: [coordinates[1], coordinates[0]]
        })
      }
    })
  })

  const point_coordinates = points.map((p) => p.lat_lon_coordinates)
  log(`getting elevation for ${point_coordinates.length} points`)
  const elevations = await get_elevation(point_coordinates)
  elevations.forEach((elevation, index) => {
    points[index].elevation = elevation
  })

  const highest_points = []

  const points_by_grid_index = group_by(points, 'grid_index')
  for (const grid_index in points_by_grid_index) {
    const points = points_by_grid_index[grid_index]
    const highest_point = find_item_with_highest_value(points, 'elevation')
    highest_points.push(highest_point)
  }

  if (!highest_points.length) {
    const highest_point = await find_highest_elevation_within_polygon(
      feature_polygon
    )
    highest_points.push(highest_point)
  }

  /* const collection = turf.featureCollection([
   *   feature_polygon,
   *   ...parcel_square_grid.features,
   *   ...highest_points.map(p => turf.point(p.lon_lat_coordinates))
   * ])
   * fs.writeJsonSync('./test.geo.json', collection)
   */
  return highest_points
}

const calculate_viewshed_index_for_parcel = async (parcel) => {
  const parcel_feature = turf.polygon([parcel.coordinates])
  const points = await find_high_elevation_points_within_polygon(parcel_feature)
  log(
    `generated ${points.length} points for viewshed analysis in ${parcel.path}`
  )

  const inserts = []
  for (const point_item of points) {
    const point = turf.point(point_item.lon_lat_coordinates)

    // TODO - check no longer needed
    if (!turf.booleanPointInPolygon(point, parcel_feature)) {
      log('found point outside parcel polygon')
      process.exit()
      continue
    }

    const longitude = point.geometry.coordinates[0]
    const latitude = point.geometry.coordinates[1]
    const viewshed_index = await calculate_viewshed_index({
      longitude,
      latitude
    })

    inserts.push({
      path: parcel.path,
      latitude,
      longitude,
      ...viewshed_index
    })
  }

  if (inserts.length) {
    log(`saving ${inserts.length} viewshed points for parcel`)
    await db('parcels_viewshed').insert(inserts).onConflict().merge()
  }
}

const get_viewshed_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.path', 'parcels_geometry.coordinates')
  parcels_query.join(
    'parcels_geometry',
    'parcels_geometry.path',
    'parcels.path'
  )
  parcels_query
    .leftJoin('parcels_viewshed', 'parcels_viewshed.path', 'parcels.path')
    .whereNull('parcels_viewshed.viewshed_index')

  parcels_query.orderByRaw('RAND()')

  return parcels_query
}

export default calculate_viewshed_index

const main = async () => {
  let error
  try {
    if (argv.lat && argv.lon) {
      const point = {
        latitude: argv.lat,
        longitude: argv.lon
      }

      const viewshed_index = await calculate_viewshed_index(point)
      log({
        point,
        viewshed_index
      })
    } else if (argv.parcels) {
      const parcels = await get_viewshed_parcels()
      log(`parcels missing viewshed: ${parcels.length}`)
      // get parcel geometries with missing viewshed_indexes
      for (const parcel of parcels) {
        console.time('calculate-viewshed-parcel')
        try {
          await calculate_viewshed_index_for_parcel(parcel)
        } catch (err) {
          log(`Unable to generate viewshed for ${parcel.path}`)
          log(err)
        } finally {
          console.timeEnd('calculate-viewshed-parcel')
        }
      }
    } else {
      await calculate_viewshed_index_for_united_states()
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
