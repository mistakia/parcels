import debug from 'debug'

import db from '../db/index.js'
// import config from '../config.js'
import { isMain } from '../common/index.js'
import importCounty from './import-county.js'

const log = debug('importer')
debug.enable('importer,import-county')

const getParcelCount = async (path) => {
  const re = await db('parcels')
    .where('path', 'like', `${path}%`)
    .count('* as count')
  return re[0].count
}

const importer = async () => {
  let property_areas = await db('properties')
  property_areas = property_areas
    .filter((p) => p.num_parcels && p.sqmi)
    .filter((p) => p.classes === 'place county')

  for (const area of property_areas) {
    area.avg_sqmi = area.sqmi / area.num_parcels
  }

  property_areas = property_areas.sort((a, b) => b.avg_sqmi - a.avg_sqmi)

  const items = property_areas.slice(0, 10)

  for (const item of items) {
    const count = await getParcelCount(item.path)
    if (count === item.num_parcels) {
      log(`skipping ${item.path}, already imported`)
      continue
    }
    log({ count, path: item.path })
    const start = Math.max(1, Math.floor(count / 200))
    const result = await importCounty({ county: item.path, start })
    if (!result) {
      log('importer ending, received no result')
      return
    }
  }
}

export default importer

const main = async () => {
  let error
  try {
    await importer()
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

if (isMain(import.meta.url)) {
  main()
}
