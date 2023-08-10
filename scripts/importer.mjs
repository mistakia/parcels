import debug from 'debug'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, getParcelCount, getProperty } from '#utils'
import importCounty from './import-county.mjs'
import { savePropertyStats, getProperties } from './import-properties.mjs'

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

  log(`found ${property_areas.length} property areas`)

  const items = property_areas.sort((a, b) => b.avg_sqmi - a.avg_sqmi)

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

    // update property count before import
    const properties_a = await getProperties(path.dirname(item.path))
    const property = properties_a.find((p) => p.path === item.path)
    if (!property) {
      log(`unable to get property info for ${item.path}`)
      continue
    }
    await savePropertyStats(property)

    // check count after update
    count = await getParcelCount(item.path)
    if (count >= item.num_parcels) {
      log(`skipping ${item.path}, already imported`)
      continue
    }

    log({ count, path: item.path, parcels: item.num_parcels })
    const prop = await getProperty(item.path)
    const start =
      (prop && prop.import_cursor) || Math.max(1, Math.floor(count / 200))
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
