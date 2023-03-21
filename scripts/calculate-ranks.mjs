import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-ranks')
debug.enable('calculate-ranks')

const calculate_rank_for_field = async ({ field, table_name }) => {
  console.time(field)
  await db.raw(`
    INSERT INTO parcels_rank (ll_uuid, ${field}_rank)
    SELECT pa.ll_uuid, (PERCENT_RANK() OVER (ORDER BY pa.${field}) * 100) - 50
    FROM ${table_name} pa
    WHERE pa.${field} IS NOT NULL
    ON CONFLICT (ll_uuid) DO UPDATE SET ${field}_rank = EXCLUDED.${field}_rank
  `)
  console.timeEnd(field)
}

const calculate_ranks = async () => {
  const items = [
    {
      field: 'hardiness_temp',
      table_name: 'parcels_agriculture'
    },
    {
      field: 'max_download_speed',
      table_name: 'parcels_internet'
    },
    {
      field: 'max_upload_speed',
      table_name: 'parcels_internet'
    },
    {
      field: 'closest_provider_distance',
      table_name: 'parcels_internet'
    },
    {
      field: 'nearby_max_download_speed',
      table_name: 'parcels_internet'
    },
    {
      field: 'nearby_max_upload_speed',
      table_name: 'parcels_internet'
    },
    {
      field: 'surrounding_coverage_density',
      table_name: 'parcels_internet'
    },
    {
      field: 'closest_military_distance',
      table_name: 'parcels_density'
    },
    {
      field: 'military_count_25km',
      table_name: 'parcels_density'
    },
    {
      field: 'military_count_50km',
      table_name: 'parcels_density'
    },
    {
      field: 'military_count_200km',
      table_name: 'parcels_density'
    },
    {
      field: 'closest_spring_distance',
      table_name: 'parcels_density'
    },
    {
      field: 'spring_count_1km',
      table_name: 'parcels_density'
    },
    {
      field: 'spring_count_5km',
      table_name: 'parcels_density'
    },
    {
      field: 'spring_count_10km',
      table_name: 'parcels_density'
    },
    {
      field: 'spring_count_50km',
      table_name: 'parcels_density'
    },
    {
      field: 'spring_count_100km',
      table_name: 'parcels_density'
    }
  ]

  for (const item of items) {
    log(`calculating rank for ${item.field}`)
    await calculate_rank_for_field(item)
  }
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
