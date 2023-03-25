import * as turf from '@turf/turf'
import { get_parcel_polygon } from '@common'

export function get_parcels(state) {
  return state.get('parcels')
}

export function get_parcel_features(state) {
  const parcels = state.get('parcels')

  return parcels
    .map((p) => {
      if (p.get('coordinates')) {
        return get_parcel_polygon(p.get('coordinates'))
      }

      return turf.point([p.get('lon'), p.get('lat')])
    })
    .toJS()
}

export function get_parcels_bounding_box(state) {
  const parcels = state.get('parcels')
  if (!parcels.size) {
    return [0, 0, 0, 0]
  }

  const features = get_parcel_features(state)
  return turf.bbox(turf.featureCollection(features))
}
