import * as turf from '@turf/turf'
import { get_parcel_polygon } from '@common'

export function get_parcels(state) {
  return state.get('parcels')
}

export function get_parcels_bounding_box(state) {
  const parcels = state.get('parcels').toList()
  if (!parcels.size) {
    return [0, 0, 0, 0]
  }

  const features = parcels.map((p) => {
    if (p.coordinates) {
      return get_parcel_polygon(p.coordinates)
    }

    return turf.point([p.lon, p.lat])
  })

  return turf.bbox(turf.featureCollection(features.toJS()))
}
