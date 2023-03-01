import debug from 'debug'
import mysql from 'mysql2/promise'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
import config from '#config'
import { isMain } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
// const log = debug('generate-column-updated-triggers')
debug.enable('generate-column-updated-triggers')

const connection = mysql.createPool(config.mysql.connection)

const create_trigger = async ({ trigger_type, column_name, table_name }) => {
  const trigger_name =
    `${trigger_type}_${table_name}_${column_name}`.toLowerCase()
  await connection.query(`DROP TRIGGER IF EXISTS ${trigger_name}`)
  await connection.query(
    `CREATE TRIGGER ${trigger_name}` +
      ` AFTER ${trigger_type} ON ${table_name}` +
      ' FOR EACH ROW' +
      ' BEGIN' +
      ' UPDATE coverage' +
      ' SET column_updated = NOW()' +
      ` WHERE column_name = '${column_name}';` +
      ' END'
  )
}

const generate_column_updated_triggers = async () => {
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

  const columns = await db('INFORMATION_SCHEMA.COLUMNS')
    .select(
      'INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME as column_name',
      'INFORMATION_SCHEMA.COLUMNS.TABLE_NAME as table_name'
    )
    .whereIn('INFORMATION_SCHEMA.COLUMNS.TABLE_NAME', tables)

  for (const { column_name, table_name } of columns) {
    await create_trigger({ trigger_type: 'UPDATE', column_name, table_name })
    await create_trigger({ trigger_type: 'INSERT', column_name, table_name })
  }
}

export default generate_column_updated_triggers

const main = async () => {
  let error
  try {
    await generate_column_updated_triggers()
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
