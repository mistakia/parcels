import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

// import db from '#db'
// import config from '#config'
import { isMain, get_parcels_query } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('filtered_parcels')
debug.enable('filtered_parcels')

const group = async ({ column, threshold = 0 } = {}) => {
  const parcels_query = get_parcels_query()
  parcels_query
    .select(column)
    .count('* as count')
    .groupBy(column)
    .orderBy('count', 'desc')
  if (threshold) {
    parcels_query.having('count', '>', threshold)
  }
  const parcels = await parcels_query
  log(parcels)
}

const filtered_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.count('* as count')
  log(parcels_query.toString())
  const result = await parcels_query

  log(`filtered parcels: ${result[0].count}`)

  await group({ column: 'usedesc' })
  await group({ column: 'owner', threshold: 10 })
  await group({ column: 'zoning_description', threshold: 10 })
  await group({ column: 'lbcs_activity', threshold: 10 })
  await group({ column: 'lbcs_activity_desc', threshold: 10 })
  await group({ column: 'lbcs_function', threshold: 10 })
  await group({ column: 'lbcs_function_desc', threshold: 10 })
  await group({ column: 'lbcs_structure', threshold: 10 })
  await group({ column: 'lbcs_structure_desc', threshold: 10 })
  await group({ column: 'lbcs_site', threshold: 10 })
  await group({ column: 'lbcs_site_desc', threshold: 10 })
  await group({ column: 'lbcs_ownership', threshold: 10 })
  await group({ column: 'lbcs_ownership_desc', threshold: 10 })
  await group({ column: 'ciuse', threshold: 10 })
  await group({ column: 'descciuse', threshold: 10 })
}

export default filtered_parcels

const main = async () => {
  let error
  try {
    await filtered_parcels()
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
