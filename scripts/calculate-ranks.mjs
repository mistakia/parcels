import debug from 'debug'
import sizeof from 'object-sizeof'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, chunk_inserts } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-ranks')
debug.enable('calculate-ranks')

const handle_rows = async ({ field, sorted_rows }) => {
  const inserts = sorted_rows.map((row, index) => ({
    ll_uuid: row.ll_uuid,
    [`${field}_rank`]: Math.round((index / sorted_rows.length) * 100) - 50
  }))
  await chunk_inserts({
    inserts,
    chunk_size: 10000,
    save: async (chunk) => {
      await db('parcels_rank').insert(chunk).onConflict('ll_uuid').merge()
      log(`inserted ${chunk.length} ${field} ranks`)
    }
  })
}

const calculate_hardiness_temp_rank = async () => {
  const field = 'hardiness_temp'
  console.time(field)
  const rows = await db('parcels_agriculture')
    .select('ll_uuid', field)
    .whereNotNull(field)
  log(`query response size: ${sizeof(rows)}`)
  const sorted_rows = rows.sort((a, b) => a[field] - b[field])
  await handle_rows({ field, sorted_rows })
  console.timeEnd('calculate_rank')
}

const calculate_broadband_ranks = async () => {
  const fields = [
    'max_download_speed',
    'max_upload_speed',
    'closest_provider_distance',
    'nearby_max_download_speed',
    'nearby_max_upload_speed',
    'surrounding_coverage_density'
  ]
  for (const field of fields) {
    console.time(field)
    const rows = await db('parcels_internet')
      .select('ll_uuid', field)
      .whereNotNull(field)
    const sorted_rows = rows.sort((a, b) => a[field] - b[field])
    await handle_rows({ field, sorted_rows })
    console.timeEnd(field)
  }
}

const calculate_closest_military_distance_rank = async () => {
  const field = 'closest_military_distance'
  console.time(field)
  const rows = await db('parcels_density')
    .select('ll_uuid', field)
    .whereNotNull(field)
  const sorted_rows = rows.sort((a, b) => a[field] - b[field])
  await handle_rows({ field, sorted_rows })
  console.timeEnd(field)
}

const calculate_military_density_ranks = async () => {
  const fields = [
    'military_count_25km',
    'military_count_50km',
    'military_count_200km'
  ]
  for (const field of fields) {
    console.time(field)
    const rows = await db('parcels_density')
      .select('ll_uuid', field)
      .whereNotNull(field)
    const sorted_rows = rows.sort((a, b) => b[field] - a[field])
    log(sorted_rows[0])
    log(sorted_rows[sorted_rows.length - 1])
    await handle_rows({ field, sorted_rows })
    console.timeEnd(field)
  }
}

const calculate_closest_spring_distance_rank = async () => {
  const field = 'closest_spring_distance'
  console.time(field)
  const rows = await db('parcels_density')
    .select('ll_uuid', field)
    .whereNotNull(field)
  const sorted_rows = rows.sort((a, b) => b[field] - a[field])
  await handle_rows({ field, sorted_rows })
  console.timeEnd(field)
}

const calculate_spring_density_ranks = async () => {
  const fields = [
    'spring_count_1km',
    'spring_count_5km',
    'spring_count_10km',
    'spring_count_50km',
    'spring_count_100km'
  ]
  for (const field of fields) {
    console.time(field)
    const rows = await db('parcels_density')
      .select('ll_uuid', field)
      .whereNotNull(field)
    const sorted_rows = rows.sort((a, b) => a[field] - b[field])
    log(sorted_rows[0])
    log(sorted_rows[sorted_rows.length - 1])
    await handle_rows({ field, sorted_rows })
    console.timeEnd(field)
  }
}

const calculate_ranks = async () => {
  await calculate_hardiness_temp_rank()
  await calculate_broadband_ranks()
  await calculate_closest_military_distance_rank()
  await calculate_military_density_ranks()
  await calculate_closest_spring_distance_rank()
  await calculate_spring_density_ranks()
}

export default calculate_ranks

const main = async () => {
  let error
  try {
    await calculate_ranks()
  } catch (err) {
    error = err
    console.log(error)
  }

  /* await db('jobs').insert({
   *   type: constants.jobs.EXAMPLE,
   *   succ: error ? 0 : 1,
   *   reason: error ? error.message : null,
   *   timestamp: Math.round(Date.now() / 1000)
   * })
   */
  process.exit()
}

if (isMain) {
  main()
}
