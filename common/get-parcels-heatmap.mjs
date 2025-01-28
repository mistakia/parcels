import db from '#db'
import { build_parcels_query } from './get-parcels-query-results.mjs'

export default async function get_parcels_heatmap({
  resolution = 4,
  ...parcel_query_params
}) {
  const parcels_query = build_parcels_query({
    ...parcel_query_params,
    ignore_limit: true
  })

  parcels_query.select(
    db.raw('h3_lat_lng_to_cell(point(lon, lat), ?) as h3_index', [resolution])
  )

  const heatmap_query = db
    .with('parsed_paths', parcels_query)
    .select([
      'h3_index',
      db.raw('count(*) as parcel_count'),
      db.raw('avg(rank_aggregation) as avg_rank')
    ])
    .from('parsed_paths')
    .groupBy('h3_index')
    .orderByRaw('avg_rank desc NULLS LAST')
    .orderBy('parcel_count', 'desc')

  return heatmap_query
}
