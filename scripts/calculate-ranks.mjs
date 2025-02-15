import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-ranks')
debug.enable('calculate-ranks')

const calculate_rank_for_field = async ({ field, table_name, order_by }) => {
  console.time(field)
  await db.raw(
    `ALTER TABLE parcels_rank ADD COLUMN IF NOT EXISTS ${field}_rank smallint`
  )
  await db.raw(`
    INSERT INTO parcels_rank (ll_uuid, ${field}_rank)
    SELECT pa.ll_uuid, ((1 - (PERCENT_RANK() OVER (ORDER BY pa.${field} ${order_by}))) * 100)
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
      table_name: 'parcels_agriculture',
      order_by: 'DESC'
    },
    {
      field: 'max_download_speed',
      table_name: 'parcels_internet',
      order_by: 'DESC'
    },
    {
      field: 'max_upload_speed',
      table_name: 'parcels_internet',
      order_by: 'DESC'
    },
    {
      field: 'closest_provider_distance',
      table_name: 'parcels_internet',
      order_by: 'ASC'
    },
    {
      field: 'nearby_max_download_speed',
      table_name: 'parcels_internet',
      order_by: 'DESC'
    },
    {
      field: 'nearby_max_upload_speed',
      table_name: 'parcels_internet',
      order_by: 'DESC'
    },
    {
      field: 'surrounding_coverage_density',
      table_name: 'parcels_internet',
      order_by: 'DESC'
    },
    {
      field: 'closest_military_distance',
      table_name: 'parcels_density',
      order_by: 'DESC'
    },
    {
      field: 'military_count_25km',
      table_name: 'parcels_density',
      order_by: 'ASC'
    },
    {
      field: 'military_count_50km',
      table_name: 'parcels_density',
      order_by: 'ASC'
    },
    {
      field: 'military_count_200km',
      table_name: 'parcels_density',
      order_by: 'ASC'
    },
    {
      field: 'closest_spring_distance',
      table_name: 'parcels_density',
      order_by: 'ASC'
    },
    {
      field: 'spring_count_1km',
      table_name: 'parcels_density',
      order_by: 'DESC'
    },
    {
      field: 'spring_count_5km',
      table_name: 'parcels_density',
      order_by: 'DESC'
    },
    {
      field: 'spring_count_10km',
      table_name: 'parcels_density',
      order_by: 'DESC'
    },
    {
      field: 'spring_count_50km',
      table_name: 'parcels_density',
      order_by: 'DESC'
    },
    {
      field: 'spring_count_100km',
      table_name: 'parcels_density',
      order_by: 'DESC'
    }
  ]

  // Weather summary fields to rank
  const weather_summary_fields = [
    { field: 'avg_fair_days', order_by: 'DESC' },
    { field: 'avg_perfect_days', order_by: 'DESC' },
    { field: 'avg_active_days', order_by: 'DESC' },
    { field: 'avg_dinner_outside_days', order_by: 'DESC' },
    { field: 'avg_indoor_days', order_by: 'ASC' },
    { field: 'avg_hrs_below_0c', order_by: 'ASC' },
    { field: 'avg_hrs_below_5c', order_by: 'ASC' },
    { field: 'avg_hrs_below_10c', order_by: 'ASC' },
    { field: 'avg_daytime_hrs_below_0c', order_by: 'ASC' },
    { field: 'avg_daytime_hrs_below_5c', order_by: 'ASC' },
    { field: 'avg_daytime_hrs_below_10c', order_by: 'ASC' },
    { field: 'avg_cloudy_hours_10pct', order_by: 'ASC' },
    { field: 'avg_cloudy_hours_50pct', order_by: 'ASC' },
    { field: 'avg_cloudy_hours_90pct', order_by: 'ASC' }
  ]

  // Add weather summary fields to items array
  for (const weather_field of weather_summary_fields) {
    items.push({
      field: weather_field.field,
      table_name: 'parcels_weather_summary',
      order_by: weather_field.order_by
    })
  }

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
