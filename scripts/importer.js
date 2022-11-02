import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '../db/index.js'
// import config from '../config.js'
import { isMain, getParcelCount, getProperty } from '../common/index.js'
import importCounty from './import-county.js'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('importer')
debug.enable('importer,import-county')

const importer = async ({ max = Infinity } = {}) => {
  let property_areas = await db('properties')
  property_areas = property_areas
    .filter((p) => p.num_parcels && p.sqmi)
    .filter((p) => p.classes === 'place county')

  for (const area of property_areas) {
    area.avg_sqmi = area.sqmi / area.num_parcels
  }

  property_areas = property_areas.sort((a, b) => b.avg_sqmi - a.avg_sqmi)

  const items = property_areas.slice(0, 100)

  for (const item of items) {
    let count = await getParcelCount(item.path)
    if (count >= item.num_parcels) {
      log(`skipping ${item.path}, already imported`)
      continue
    }

    if (max !== Infinity && item.num_parcels > max) {
      log(
        `skipping ${item.path}, parcel count (${item.num_parcels}) is greater than max limit (${max})`
      )
      continue
    }

    log({ count, path: item.path, parcels: item.num_parcels })
    const prop = await getProperty(item.path)
    const start = (prop && prop.import_cursor) ||  Math.max(1, Math.floor(count / 200))
    const result = await importCounty({ county: item.path, start })
    if (!result) {
      log('importer ending, received no result')
      return
    }

    count = await getParcelCount(item.path)
    if (count < item.num_parcels) {
      log(`restarting import of ${item.path}, still missing parcels`)
      const result = await importCounty({ county: item.path, start: 1 })
      if (!result) {
        log('importer ending, received no result')
        return
      }
    }
  }
}

export default importer

const main = async () => {
  let error
  try {
    await importer({ max: argv.max })
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
