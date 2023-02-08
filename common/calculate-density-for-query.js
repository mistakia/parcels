import debug from 'debug'
import * as turf from '@turf/turf'
// import fs from 'fs-extra'

import within_distance from './within-distance.js'
import generate_raster_points_within_radius from './generate-raster-points-within-radius.js'

const log = debug('calculate-density')

const default_distances = [1, 5, 10, 25, 50, 100, 150, 200, 250, 300, 500, 1000]

const get_cell_size = (radius_meters) => {
  if (radius_meters <= 1000) {
    return 30
  } else if (radius_meters <= 5000) {
    return 50
  } else if (radius_meters <= 10000) {
    return 100
  } else {
    return Math.round(radius_meters / 180)
  }
}

const calculate_polygon_density = ({ polygons, point, radius, cell_size }) => {
  let density = 0

  const raster_points = generate_raster_points_within_radius({
    longitude: point.longitude,
    latitude: point.latitude,
    radius,
    cell_size
  })

  // Check if each point in the raster is inside a polygon
  for (const raster_point of raster_points) {
    const pt = turf.point([raster_point.longitude, raster_point.latitude])
    for (const polygon of polygons) {
      if (turf.booleanPointInPolygon(pt, polygon.geometry)) {
        density++
        break
      }
    }
  }

  // Return the density as a proportion of the total number of points in the raster
  return density / raster_points.length
}

export default async function ({
  query,
  name,
  latitude,
  longitude,
  distance,
  is_point = false
} = {}) {
  if (!query) {
    throw new Error('missing query')
  }

  if (!name) {
    throw new Error('missing name')
  }

  if (!latitude) {
    throw new Error('missing latitude')
  }

  if (!longitude) {
    throw new Error('missing longitude')
  }

  if (!distance) {
    throw new Error('distance missing')
  }

  console.time('calculate_density')

  console.time('query')
  const query_results = await query
  console.timeEnd('query')

  log(`query returned ${query_results.length} results`)

  const query_results_parsed = query_results.map(({ geometry, ...rest }) => ({
    geometry: JSON.parse(geometry),
    ...rest
  }))
  const {
    name: closest_name,
    distance: closest_distance,
    geometry: closest_geometry,
    ...closest_tags
  } = query_results[0] || {}
  const geojson_point = turf.point([longitude, latitude])
  const point = { longitude, latitude }

  /* fs.writeJsonSync(
   *   './test.geo.json',
   *   turf.featureCollection([
   *     geojson_point,
   *     turf.circle(geojson_point, 1),
   *     turf.circle(geojson_point, 5),
   *     turf.circle(geojson_point, 10),
   *     turf.circle(geojson_point, 50),
   *     ...query_results.map((p) => turf.feature(p.geometry, { name: p.name }))
   *   ])
   * )
   * log('outputted json')
   */
  // distance radiuses to use
  const distances = []
  for (const d of default_distances) {
    if (d * 1000 <= distance) distances.push(d)
  }

  const calculations = {}
  for (const d of distances) {
    const key = `calculate_distance_${d}km`
    console.time(key)
    if (!is_point) {
      const radius_meters = d * 1000
      calculations[`density_${d}km`] = calculate_polygon_density({
        polygons: query_results_parsed,
        point,
        radius: radius_meters,
        cell_size: get_cell_size(radius_meters)
      })
    }
    calculations[`items_${d}km`] = query_results_parsed.filter((p) =>
      within_distance({ geojson: p.geometry, geojson_point, distance: d })
    )
    console.timeEnd(key)
  }

  console.timeEnd('calculate_density')

  const format_tags = (tags) =>
    Object.entries(tags)
      .filter((i) => Boolean(i[1]))
      .map((i) => `${i[0]}=${i[1]}`)
      .join(',')

  const return_value = {
    point,
    [`closest_${name}_name`]: closest_name,
    [`closest_${name}_distance`]: closest_distance,
    [`closest_${name}_tags`]: format_tags(closest_tags),
    closest_10_items: query_results
      .slice(0, 10)
      .map(({ name, distance, area, geometry, ...tags }) => {
        const item = {
          name,
          distance,
          tags: format_tags(tags)
        }

        if (!is_point) {
          item.area = turf.area(JSON.parse(geometry))
        }

        return item
      })
  }

  for (const d of distances) {
    const items = calculations[`items_${d}km`]
    return_value[`${name}_${d}km`] = [
      ...new Set(items.map((i) => i.name).filter((name) => Boolean(name)))
    ]
    return_value[`${name}_count_${d}km`] = items.length

    if (!is_point) {
      return_value[`${name}_density_${d}km`] = calculations[`density_${d}km`]
    }
  }

  return return_value
}
