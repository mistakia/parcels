import * as turf from '@turf/turf'

export default function ({ geojson, geojson_point, distance }) {
  const is_point = geojson.type === 'Point'

  if (is_point) {
    const d = turf.distance(geojson, geojson_point)
    return d < distance
  }

  if (turf.booleanPointInPolygon(geojson_point, geojson)) {
    return true
  }

  for (let i = 0; i < geojson.coordinates[0].length - 1; i++) {
    const line = turf.lineString([
      geojson.coordinates[0][i],
      geojson.coordinates[0][i + 1]
    ])
    const d = turf.pointToLineDistance(geojson_point, line)
    if (d < distance) {
      return true
    }
  }

  return false
}
