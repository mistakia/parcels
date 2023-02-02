import debug from 'debug'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs-extra'
import * as turf from '@turf/turf'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// import db from '#db'
// import config from '#config'
import { isMain, data_path } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-view')
debug.enable('calculate-view')

function to_radians(degree) {
  return (degree * Math.PI) / 180
}

// returns a coordinate given a starting coordinate, degree direction and distance
function get_coordinate(start, degree, distance) {
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

  return {
    latitude: (lat2 * 180) / Math.PI,
    longitude: (lon2 * 180) / Math.PI,
    distance
  }
}

function generate_intermediate_points(start_point, end_point, steps) {
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
  // log(`getting elevation data for coorindates: ${latitude},${longitude}`)
  // console.time('api-response-time')
  const url = 'http://192.168.1.100:3000'
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(coordinates),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // console.timeEnd('api-response-time')
  return res.json()
}

const calculate_viewshed_index = async (start_point) => {
  console.time('calculate-viewshed-index')
  let viewshed_index = 0

  for (let degree = 0; degree < 360; degree++) {
    const distance = 100 // kilometers
    const end_point = get_coordinate(start_point, degree, distance)

    const steps = (distance * 1000) / 50
    const view_line_intermediate_points = generate_intermediate_points(
      start_point,
      end_point,
      steps
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

    const view_line_visibility = []
    view_line_intermediate_points.forEach((target_point, index) => {
      const intermediate_points = view_line_intermediate_points.slice(0, index)
      const is_visible = has_line_of_sight(
        start_point,
        target_point,
        intermediate_points
      )
      view_line_visibility.push({
        point: target_point,
        is_visible
      })
    })

    const view_line_viewshed_index = view_line_visibility.filter(
      (i) => i.is_visible
    ).length

    viewshed_index += view_line_viewshed_index
  }

  console.timeEnd('calculate-viewshed-index')
  return viewshed_index
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

    const viewshed_index = await calculate_viewshed_index(start_point)

    log({
      start_point,
      viewshed_index
    })
  }
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
