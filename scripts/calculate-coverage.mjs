import debug from 'debug'
import dayjs from 'dayjs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, get_column_coverage } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-coverage')
debug.enable('calculate-coverage')

const calculate_coverage = async ({ force_update = false }) => {
  const tables = [
    'parcels',
    'parcels_agriculture',
    'parcels_airport',
    'parcels_coastline',
    'parcels_density',
    'parcels_elevation',
    'parcels_geometry',
    'parcels_internet',
    'parcels_meta',
    'parcels_nature',
    'parcels_rank',
    'parcels_road',
    'parcels_viewshed',
    'parcels_weather_summary'
  ]

  const query = `
    SELECT
      INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME as column_name,
      INFORMATION_SCHEMA.COLUMNS.TABLE_NAME as table_name,
      coverage.coverage_updated,
      coverage.column_updated
    FROM INFORMATION_SCHEMA.COLUMNS
    LEFT JOIN coverage ON
      coverage.column_name = INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME AND
      coverage.table_name = INFORMATION_SCHEMA.COLUMNS.TABLE_NAME
    WHERE INFORMATION_SCHEMA.COLUMNS.TABLE_NAME IN (${tables.map((t) => `'${t}'`).join(',')})`

  const results = await db.raw(query)
  const columns = results.rows

  for (const column of columns) {
    const coverage_updated = dayjs.unix(column.coverage_updated)

    if (column.column_updated && !force_update) {
      const column_updated = dayjs(column.column_updated)
      if (coverage_updated.isAfter(column_updated)) {
        log(
          `skipping ${column.column_name} in ${column.table_name} because it was last modified on ${column_updated} and coverage was last calculated on ${coverage_updated}`
        )
        continue
      }
    } else if (column.coverage_updated && !force_update) {
      log(
        `skipping ${column.column_name} in ${column.table_name} because coverage was last calculated on ${coverage_updated}`
      )
      continue
    }

    await get_column_coverage({ use_cache: false, ...column })
    log(`calculated coverage for ${column.column_name} in ${column.table_name}`)
  }
}

export default calculate_coverage

const main = async () => {
  let error
  try {
    await calculate_coverage({ force_update: argv.force_update })
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
