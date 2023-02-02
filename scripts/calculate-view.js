import debug from 'debug'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs-extra'
import * as turf from '@turf/turf'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

// import db from '#db'
// import config from '#config'
import { isMain, data_path } from '#common'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-view')
debug.enable('calculate-view')

function toRadians(degree) {
  return (degree * Math.PI) / 180
}

function generate_intermediate_points(start_point, end_point, steps) {
  const coordinates = []
  const startLat = toRadians(start_point.latitude)
  const startLng = toRadians(start_point.longitude)
  const endLat = toRadians(end_point.latitude)
  const endLng = toRadians(end_point.longitude)
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
  console.time('api-response-time')
  const url = 'http://192.168.1.100:3000'
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(coordinates),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  console.timeEnd('api-response-time')
  return data
}

const calculate_view = async () => {
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

    const end_point = {
      latitude: point.geometry.coordinates[1] + 0.1,
      longitude: point.geometry.coordinates[0]
    }

    const view_line_intermediate_points = generate_intermediate_points(
      start_point,
      end_point,
      100
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

    const visibility_index = view_line_visibility.filter(
      (i) => i.is_visible
    ).length

    log({
      start_point,
      visibility_index
    })
  }
}

export default calculate_view

const main = async () => {
  let error
  try {
    await calculate_view()
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
