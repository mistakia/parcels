import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, get_column_coverage } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-coverage')
debug.enable('calculate-coverage')

const calculate_coverage = async () => {
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
    'parcels_viewshed'
  ]

  const time_cutoff = Math.round(Date.now() / 1000) - 864000 // 10 days ago
  const columns = await db('INFORMATION_SCHEMA.COLUMNS')
    .select(
      'INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME as column_name',
      'INFORMATION_SCHEMA.COLUMNS.TABLE_NAME as table_name'
    )
    .whereIn('INFORMATION_SCHEMA.COLUMNS.TABLE_NAME', tables)
    .leftJoin('coverage', function () {
      this.on(
        'coverage.column_name',
        '=',
        'INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME'
      )
      this.andOn(
        'coverage.table_name',
        '=',
        'INFORMATION_SCHEMA.COLUMNS.TABLE_NAME'
      )
    })
    .where(function () {
      this.where('coverage.updated', '<', time_cutoff)
      this.orWhereNull('coverage.updated')
    })

  log(`${columns.length} columns need coverage calculations`)

  for (const column of columns) {
    await get_column_coverage(column)
    log(`calculated coverage for ${column.column_name} in ${column.table_name}`)
  }
}

export default calculate_coverage

const main = async () => {
  let error
  try {
    await calculate_coverage()
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
