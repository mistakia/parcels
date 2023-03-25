import * as turf from '@turf/turf'
import * as constants from './constants.mjs'

export const get_parcel_polygon = (parcel_coordinates, properties) => {
  if (Array.isArray(parcel_coordinates[0][0])) {
    return turf.multiPolygon([parcel_coordinates], properties)
  } else {
    return turf.polygon([parcel_coordinates], properties)
  }
}

export const get_string_from_object = (obj) => {
  let k
  let cls = ''
  for (k in obj) {
    if (obj[k]) {
      cls && (cls += ' ')
      cls += k
    }
  }
  return cls
}

export { constants }
