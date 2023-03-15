import db from '#db'

export default async function ({ column_name, table_name, use_cache = true }) {
  const past_results = await db('coverage').where({ column_name, table_name })
  if (past_results.length && use_cache) {
    return past_results[0]
  }

  const query = db('parcels').select(
    db.raw('COUNT(*) AS total_rows'),
    db.raw(`COUNT(${table_name}.${column_name}) AS covered_rows`),
    db.raw(
      `(COUNT(${table_name}.${column_name}) / COUNT(*)) * 100 AS coverage_percentage`
    )
  )

  if (table_name !== 'parcels') {
    query.leftJoin(table_name, 'parcels.ll_uuid', `${table_name}.ll_uuid`)
  }

  const result = await query

  const item = {
    ...(result.length ? result[0] : {}),
    column_name,
    table_name,
    coverage_updated: Math.round(Date.now() / 1000)
  }

  if (result.length) {
    await db('coverage')
      .insert(item)
      .onConflict(['column_name', 'table_name'])
      .merge()
  }

  return item
}
