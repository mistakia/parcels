import db from '#db'

export default async function ({
  path,
  ll_uuid,
  ogc_fid,
  detailed = false
} = {}) {
  const parcel_query = db('parcels')

  if (ll_uuid) {
    parcel_query.where({ ll_uuid })
  } else {
    if (path) {
      parcel_query.where({ path })
    }

    if (ogc_fid) {
      parcel_query.where({ ogc_fid })
    }
  }

  const parcels = await parcel_query

  if (parcels.length > 1) {
    throw new Error('found multiple matching parcels')
  }

  const parcel = parcels[0]

  if (!parcel || !detailed) {
    return parcel
  }

  // Get all related data when detailed is true
  const related_tables = [
    'parcels_agriculture',
    'parcels_airport',
    'parcels_coastline',
    'parcels_density',
    'parcels_election_results',
    'parcels_elevation',
    'parcels_geometry',
    'parcels_internet',
    'parcels_meta',
    'parcels_nature',
    'parcels_rank',
    'parcels_road',
    'parcels_seismic_hazards_model',
    'parcels_viewshed',
    'parcels_weather',
    'parcels_weather_summary'
  ]

  const array_tables = ['parcels_election_results', 'parcels_weather']

  const related_data = await Promise.all(
    related_tables.map(async (table) => {
      const data = await db(table).where({ ll_uuid: parcel.ll_uuid })
      return {
        [table]: array_tables.includes(table) ? data : data[0]
      }
    })
  )

  // Handle parcels_geometry_extra separately since it joins on path and ogc_fid
  const geometry_extra = await db('parcels_geometry_extra').where({
    path: parcel.path,
    ogc_fid: parcel.ogc_fid
  })

  return {
    ...parcel,
    ...Object.assign({}, ...related_data),
    parcels_geometry_extra: geometry_extra
  }
}
