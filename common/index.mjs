import * as turf from '@turf/turf'

export const get_parcel_polygon = (parcel_coordinates, properties) => {
  if (Array.isArray(parcel_coordinates[0][0])) {
    return turf.multiPolygon([parcel_coordinates], properties)
  } else {
    return turf.polygon([parcel_coordinates], properties)
  }
}
