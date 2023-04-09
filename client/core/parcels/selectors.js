import * as turf from '@turf/turf'

export function get_parcels(state) {
  return state.get('parcels')
}

export function get_parcel_features(state) {
  const parcels = state.get('parcels')

  return parcels
    .map((p) => {
      if (p.get('coordinates')) {
        try {
          return turf.polygon(p.get('coordinates'))
        } catch (e) {
          console.log(e)
        }
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
