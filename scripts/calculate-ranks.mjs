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

  const parcels_weather_columns = await db('information_schema.columns')
    .select('column_name')
    .where('table_name', 'parcels_weather')
    .whereNotIn('column_name', ['ll_uuid', 'updated'])

  const ascending_weather_types = [
    'hrs_below_0_c_apparent_temperature',
    'hrs_below_5_c_apparent_temperature',
    'hrs_below_10_c_apparent_temperature',
    'daytime_hrs_below_0_c_apparent_temperature',
    'daytime_hrs_below_5_c_apparent_temperature',
    'daytime_hrs_below_10_c_apparent_temperature',
    'indoor_days',
    'daytime_hours_above_10_pct_cloud_cover',
    'daytime_hours_above_20_pct_cloud_cover',
    'daytime_hours_above_30_pct_cloud_cover',
    'daytime_hours_above_40_pct_cloud_cover',
    'daytime_hours_above_50_pct_cloud_cover',
    'daytime_hours_above_60_pct_cloud_cover',
    'daytime_hours_above_70_pct_cloud_cover',
    'daytime_hours_above_80_pct_cloud_cover',
    'daytime_hours_above_90_pct_cloud_cover',
    'daytime_hours_above_100_pct_cloud_cover'
  ]
  for (const weather_column of parcels_weather_columns) {
    const { column_name } = weather_column
    if (column_name.includes('_dates')) {
      continue
    }
    const weather_column_type = column_name.replace(/_in_[0-9]{4}/gi, '')
    const is_asc = ascending_weather_types.includes(weather_column_type)
    items.push({
      field: column_name,
      table_name: 'parcels_weather',
      order_by: is_asc ? 'ASC' : 'DESC'
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
