import db from '#db'

export default async function ({ path, ll_uuid, ogc_fid } = {}) {
  if (ll_uuid) {
    const parcels = await db('parcels').where({ ll_uuid })
    return parcels[0]
  }

  const parcel_query = db('parcels')

  if (path) {
    parcel_query.where({ path })
  }

  if (ogc_fid) {
    parcel_query.where({ ogc_fid })
  }

  const parcels = await parcel_query

  if (parcels.length > 1) {
    throw new Error('found multiple matching parcels')
  }

  return parcels[0]
}
